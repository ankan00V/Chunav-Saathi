import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// 1. Initialize Gemini (Primary Brain)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// 2. Initialize NVIDIA NIM Clients (The "Resilience" Layer)
// Using Llama 3.2 for fast fallbacks
const fallbackClient = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: import.meta.env.VITE_LMA_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

// Using Llama 3.1 for background reasoning/fact-checking
const reasoningClient = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: import.meta.env.VITE_KIMI_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

/**
 * System prompt for the AI agent
 */
const SYSTEM_PROMPT = `You are Chunav Saathi — a vibrant, gamified AI guide built to make India's democratic process feel like an epic adventure. Your world is drenched in the colors of the tricolor.
Your mission: walk citizens through the complete Indian election process using interactive quizzes, animated timelines, progress unlocks, and celebratory milestones.

KNOWLEDGE TOPICS TO MASTER AND TEACH:
• The Election Commission of India — who they are, what powers they hold
• Types of elections: Lok Sabha, Rajya Sabha, Vidhan Sabha, Local Bodies
• The full timeline: Model Code of Conduct → Nomination → Campaigning → Polling Day → Counting → Results
• How to register as a voter (Form 6, Voter ID, NVSP portal, Form 8 for corrections)
• What happens inside a polling booth — EVM, VVPAT, booth agents, indelible ink
• NOTA, reservations, party symbols, affidavit rules — demystified with fun analogies
• Seat counts: 543 Lok Sabha, 245 Rajya Sabha, state Vidhan Sabha variations
• Majority thresholds: simple majority (272+), absolute majority, coalition dynamics

YOUR PERSONALITY & STYLE: Think Duolingo meets IPL commentary meets a wise dadi. Be punchy, warm, celebratory. Use Hindi phrases naturally (Jai Hind! Mera vote, meri awaaz!). Celebrate every correct answer with confetti energy. Never lecture — always show, quiz, explore. Use emojis generously. Make complex rules feel like game mechanics.

OUTPUT FORMAT RULES:
- BE EXTREMELY BRIEF AND CONVERSATIONAL.
- ALWAYS use emojis.
- Language: primarily English with natural Hindi phrases woven in.
- Format: [Intro] \n\n • [Point 1] \n\n • [Point 2] \n\n Samjhe nagrik? 😉`;

/**
 * Streams AI chat responses using a Multi-Model Fallback system
 */
export const streamAIChat = async (
  message: string,
  onChunk: (chunk: string) => void,
  context: any[] = []
) => {
  console.log("[AI Agent] Attempting Primary Gemini Stream...");
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const history = context.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood, nagrik! I am ready! 🇮🇳" }] },
        ...history
      ]
    });

    const result = await chat.sendMessageStream(message);
    for await (const chunk of result.stream) {
      onChunk(chunk.text());
    }
  } catch (geminiError) {
    console.warn("[AI Agent] Gemini Failed. Activating Llama-3.2 Fallback...", geminiError);
    onChunk("\n[Switching to Backup AI Core for stability...]\n");
    
    try {
      const stream = await fallbackClient.chat.completions.create({
        model: "meta/llama-3.2-3b-instruct",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...context,
          { role: "user", content: message }
        ],
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        onChunk(content);
      }
    } catch (fallbackError: any) {
      console.error("[AI Agent] All models failed.", fallbackError);
      onChunk("\n[Connection lost. Please check your internet connection.]");
    }
  }
};

interface QuizQuestion {
  q: string;
  opts: string[];
  ans: number;
  explain: string;
}

/**
 * Generates quiz data using Model Parallelism
 */
export const generateQuizData = async (
  topic: string,
  onReasoning: (chunk: string) => void
): Promise<QuizQuestion[]> => {
  console.log("[AI Agent] Generating Quiz with Parallel Reasoning...");
  
  // Use Llama 3.1 for the "Reasoning/Thought" process in the background
  const runReasoning = async () => {
    try {
      const stream = await reasoningClient.chat.completions.create({
        model: "meta/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: `Think about complex facts regarding ${topic} for a quiz.` }],
        stream: true
      });
      for await (const chunk of stream) {
        onReasoning(chunk.choices[0]?.delta?.content || "");
      }
    } catch (e) { console.warn("Reasoning layer failed, skipping..."); }
  };

  // Run reasoning in background while Gemini generates the JSON
  runReasoning();

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Generate exactly 4 multiple choice questions about ${topic}. 
    Return a JSON array: [{"q": "...", "opts": ["...", "...", "...", "..."], "ans": 0, "explain": "..."}]`;

    const result = await model.generateContent(prompt);
    const parsed = JSON.parse(result.response.text().replace(/```json/g, "").replace(/```/g, "").trim());
    return parsed;
  } catch (error) {
    console.error("[AI Agent] Quiz Generation Error:", error);
    throw error;
  }
};




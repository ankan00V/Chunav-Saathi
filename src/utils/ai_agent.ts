import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

/**
 * Message interface for chat history
 */
interface ChatMessage {
  role: "user" | "model" | "system";
  parts: { text: string }[];
}

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

GAMIFICATION RULES:
- Award Democracy Points (DP) for each topic completed
- Unlock badges: 🗳️ Pehli Baar Voter · 📜 Constitution Champ · 🏛️ Lok Sabha Legend · 🌟 ECI Expert · ⚖️ NOTA Ninja · 🏆 Chunav Champion
- Show a visual progress bar through the 6 election phases (Level 1 to Level 6)
- Offer a Final Challenge Quiz at the end with a shareable Democracy Score

OUTPUT FORMAT RULES:
- BE EXTREMELY BRIEF AND CONVERSATIONAL. Never write long paragraphs.
- If the user says a simple greeting (e.g., "hi", "hello"), reply with ONLY a short, warm greeting and ask what they want to learn. DO NOT dump information.
- ALWAYS use emojis.
- Talk like a friendly human guide (Chunav Saathi), not a Wikipedia page. Keep it punchy and fun!
- Maximum response length: 3 short sentences or bullet points.
- Language: primarily English with natural Hindi phrases woven in.

STRICT SPACING TEMPLATE:
When answering a question, you MUST format your answer EXACTLY like this:
[Short introductory sentence with emoji]

• [Bullet Point 1]

• [Bullet Point 2]

• [Bullet Point 3]

Samjhe nagrik? 😉

Begin every new session with: "Jai Hind! 🇮🇳 Welcome to Chunav Saathi — your ultimate guide to India's greatest festival of democracy! Ready to become a true Chunav Champion? Let's start your journey! 🚀"`;

/**
 * Streams AI chat responses using Google Gemini
 */
export const streamAIChat = async (
  message: string,
  onChunk: (chunk: string) => void,
  context: any[] = []
) => {
  console.log("[AI Agent] Starting Gemini chat stream...");
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Transform context to Gemini format
    const history: any[] = context.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood, nagrik! I am ready to guide India's voters with tricolor energy! 🇮🇳" }] },
        ...history
      ]
    });

    const result = await chat.sendMessageStream(message);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      onChunk(chunkText);
    }
    
    console.log("[AI Agent] Gemini stream completed.");
  } catch (error: any) {
    console.error("[AI Agent] Gemini Error:", error);
    const detail = error?.message || "Check your Gemini API key.";
    onChunk(`\n[Connection to the AI Matrix lost. Details: ${detail}]`);
  }
};

/**
 * Interface for Quiz Question
 */
interface QuizQuestion {
  q: string;
  opts: string[];
  ans: number;
  explain: string;
}

/**
 * Generates quiz data using Google Gemini
 */
export const generateQuizData = async (
  topic: string,
  onReasoning: (chunk: string) => void
): Promise<QuizQuestion[]> => {
  console.log("[AI Agent] Generating quiz via Gemini for:", topic);
  
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `You are an Indian election quiz generator. Topic: ${topic}. 
    Generate exactly 4 multiple choice questions.
    Return a JSON array of objects with these keys: 
    "q" (string with emoji), 
    "opts" (array of 4 strings), 
    "ans" (integer index 0-3), 
    "explain" (string with emoji).
    
    Example: [{"q": "❓ Question?", "opts": ["A", "B", "C", "D"], "ans": 0, "explain": "Reasoning 💡"}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Gemini can sometimes wrap JSON in code blocks even with responseMimeType
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    
    return parsed;
  } catch (error: any) {
    console.error("[AI Agent] Quiz Generation Error:", error);
    onReasoning("AI is having a momentary glitch... falling back to standard questions.");
    throw error;
  }
};



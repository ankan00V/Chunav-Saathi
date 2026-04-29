import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Fix for CORS issues: Use the local proxy defined in vite.config.ts
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/nvidia`;
  }
  return "/api/nvidia";
};

// 1. Primary Engines (NVIDIA NIM) - Using Proxy to avoid CORS errors
const client = new OpenAI({
  baseURL: getBaseURL(),
  apiKey: import.meta.env.VITE_LMA_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

const quizClient = new OpenAI({
  baseURL: getBaseURL(),
  apiKey: import.meta.env.VITE_KIMI_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

// 2. Specialized Google Service (Gemini)
// Gemini SDK handles its own requests, no proxy needed
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Chunav Saathi — a vibrant, gamified AI guide for India's elections. 
Personality: Think Duolingo meets IPL commentary. Punchy, warm, celebratory. Use Hindi phrases naturally (Jai Hind! Mera vote, meri awaaz!).
Format Rules:
- BE EXTREMELY BRIEF AND CONVERSATIONAL.
- ALWAYS use emojis.
- Language: English with natural Hindi phrases.
- Template: [Short intro] \n\n • [Point 1] \n\n • [Point 2] \n\n Samjhe nagrik? 😉`;


/**
 * Primary Chat: Powered by Llama 3.2 (NVIDIA)
 */
export const streamAIChat = async (
  message: string,
  onChunk: (chunk: string) => void,
  context: any[] = []
) => {
  try {
    const stream = await client.chat.completions.create({
      model: "meta/llama-3.2-3b-instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...context,
        { role: "user", content: message },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      onChunk(chunk.choices[0]?.delta?.content || "");
    }
  } catch (error: any) {
    console.error("[AI Agent] Chat Error:", error);
    onChunk("\n[Connection unstable. Trying to reconnect...]");
  }
};

/**
 * Primary Quiz: Powered by Llama 3.1 (NVIDIA)
 */
export const generateQuizData = async (
  topic: string,
  onReasoning: (chunk: string) => void
) => {
  // Use Gemini to generate the "Deep Reasoning" and "Fun Fact" in parallel (Google Service Points!)
  const runGeminiReasoning = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Provide a mind-blowing fun fact about ${topic} in Indian elections. Keep it 1 sentence.`;
      const result = await model.generateContent(prompt);
      onReasoning("✨ Gemini Fact-Check: " + result.response.text());
    } catch (e) {
      console.warn("Gemini reasoning failed", e);
    }
  };

  runGeminiReasoning();

  try {
    const stream = await quizClient.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [
        { 
          role: "system", 
          content: "Generate 4 MCQs about Indian elections. Return ONLY raw JSON array: [{'q': '...', 'opts': ['...', '...', '...', '...'], 'ans': 0, 'explain': '...'}]" 
        },
        { role: "user", content: `Topic: ${topic}` }
      ],
      stream: true
    });

    let fullContent = "";
    for await (const chunk of stream) {
      fullContent += chunk.choices[0]?.delta?.content || "";
    }

    const startIndex = fullContent.indexOf('[');
    const endIndex = fullContent.lastIndexOf(']') + 1;
    return JSON.parse(fullContent.substring(startIndex, endIndex));
  } catch (error: any) {
    console.error("[AI Agent] Quiz Error:", error);
    throw error;
  }
};

/**
 * Google Gemini Specialized Service: Deep Dive Fact Checker
 * This is used to verify election laws and provide high-fidelity civic data.
 */
export const getGeminiDeepDive = async (topic: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(`Provide an expert civic analysis on: ${topic} in the context of the ECI. Use a sophisticated tone.`);
  return result.response.text();
};





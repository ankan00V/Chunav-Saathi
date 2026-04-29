import OpenAI from "openai";

const client = new OpenAI({
  baseURL: window.location.origin + "/api/nvidia",
  apiKey: import.meta.env.VITE_LMA_API_KEY,
  dangerouslyAllowBrowser: true, // Required to run in frontend for the hackathon
});

export const streamAIChat = async (
  message: string,
  onChunk: (chunk: string) => void,
  context: any[] = []
) => {
  try {
    const stream = await client.chat.completions.create({
      model: "meta/llama-3.2-3b-instruct",
      messages: [
        {
          role: "system",
          content:
            `You are Chunav Saathi — a vibrant, gamified AI guide built to make India's democratic process feel like an epic adventure. Your world is drenched in the colors of the tricolor.
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

THE 6 LEVELS:
Level 1 — The Call (Election Announced): ECI powers, Model Code of Conduct, schedule
Level 2 — Enroll (Become a Voter): Form 6, EPIC card, NVSP portal, eligibility rules
Level 3 — Battle (Nomination & Campaign): Who can stand, symbols, campaign finance
Level 4 — Vote Day (Inside the Booth): EVM walkthrough, VVPAT, indelible ink simulator
Level 5 — Count (Votes Tallied): Counting centers, rounds, majority scenarios
Level 6 — Victory (Government Formed): Oath-taking, President's role, coalition politics

OUTPUT FORMAT RULES:
- BE EXTREMELY BRIEF AND CONVERSATIONAL. Never write long paragraphs.
- If the user says a simple greeting (e.g., "hi", "hello"), reply with ONLY a short, warm greeting and ask what they want to learn. DO NOT dump information.
- ALWAYS use emojis.
- Talk like a friendly human guide (Chunav Saathi), not a Wikipedia page. Keep it punchy and fun!
- Maximum response length: 3 short sentences or bullet points.
- Language: primarily English with natural Hindi phrases woven in.

STRICT SPACING TEMPLATE:
When answering a question, you MUST format your answer EXACTLY like this (notice the blank empty lines between EVERYTHING):

[Short introductory sentence with emoji]

[Blank Line]

• [Bullet Point 1]

[Blank Line]

• [Bullet Point 2]

[Blank Line]

• [Bullet Point 3]

[Blank Line]

Samjhe nagrik? 😉

Begin every new session with: "Jai Hind! 🇮🇳 Welcome to Chunav Saathi — your ultimate guide to India's greatest festival of democracy! Ready to become a true Chunav Champion? Let's start your journey! 🚀"`
        },
        ...context,
        { role: "user", content: message },
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices[0]?.delta?.content) {
        onChunk(chunk.choices[0].delta.content);
      }
    }
  } catch (error) {
    console.error("AI Error:", error);
    onChunk("\n[Connection to the AI Matrix lost. Please try again later.]");
  }
};

const quizClient = new OpenAI({
  apiKey: import.meta.env.VITE_KIMI_API_KEY,
  baseURL: window.location.origin + "/api/nvidia", // Using the Vite proxy to avoid CORS
  dangerouslyAllowBrowser: true,
});

export const generateQuizData = async (
  topic: string,
  onReasoning: (chunk: string) => void
) => {
  const stream = await quizClient.chat.completions.create({
    model: "meta/llama-3.1-8b-instruct",
    messages: [
      { 
        role: "system", 
        content: "You are an Indian election quiz generator. Generate exactly 4 multiple choice questions about the provided topic. Return ONLY a valid JSON array of objects. Each object must have: 'q' (the question string with an emoji), 'opts' (an array of 4 option strings), 'ans' (the integer index of the correct option 0-3), and 'explain' (a short explanation string with an emoji). Do not wrap the JSON in markdown code blocks. Output raw JSON only." 
      },
      { role: "user", content: `Topic: ${topic}` }
    ],
    temperature: 0.3,
    top_p: 0.9,
    max_tokens: 2000,
    stream: true
  });

  let fullContent = "";
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta as any;
    
    if (delta?.reasoning_content) {
      onReasoning(delta.reasoning_content);
    }

    if (delta?.content) {
      fullContent += delta.content;
    }
  }

  const cleaned = fullContent.substring(
    fullContent.indexOf('['),
    fullContent.lastIndexOf(']') + 1
  );
  
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse AI quiz JSON:", cleaned);
    throw e;
  }
};

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real scenario, ensure this is set securely or proxied.
// Note: For this demo, we assume the environment variable is available. 
// If running locally without env, this will throw.
// The user prompt handles strict instructions.

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are a respectful and knowledgeable Islamic Assistant named "Noor AI".
Your purpose is to provide authentic, educational information about Islam.
STRICT RULES:
1. Do NOT issue Fatwas (religious rulings). If asked for a ruling, explain the concept generally and advise consulting a qualified local scholar.
2. Be respectful, polite, and avoid controversy.
3. Base answers on Quran and authentic Hadith (Bukhari, Muslim, etc.).
4. Keep answers concise and easy to understand (simple English).
5. If the user asks in Hindi/Urdu, reply in that language or English as requested.
6. Start or end sensitive topics with "And Allah knows best."
7. Disclaimer: Always remind users that you are an AI for information only.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balanced creativity and accuracy
      },
    });

    return response.text || "I apologize, I could not generate a response at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am having trouble connecting right now. Please check your internet connection and try again later.";
  }
};
import { GoogleGenAI } from "@google/genai";

/**
 * Access the API key. In a Vite environment, process.env.API_KEY is replaced
 * during the build process with the actual value from your environment variables
 * as defined in vite.config.ts.
 */
const getApiKey = (): string => {
  try {
    // We use the direct reference so Vite's define plugin can find and replace it
    const key = process.env.API_KEY;
    if (key && key !== 'undefined' && key !== '') return key;
    return '';
  } catch {
    return '';
  }
};

export async function getLabAssistantHint(puzzleId: string, progress: string): Promise<string> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Lab Assistant hints will be unavailable.");
    return "The lab assistant seems to be offline (Missing API Key). Check your environment variables.";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Lab Assistant in "The Microscopy Escape Room". 
      The player is at puzzle: ${puzzleId}. 
      Their current progress/status is: ${progress}. 
      Give a subtle, helpful, and scientific hint in 2 sentences maximum. 
      Keep the tone encouraging and mysterious.`,
      config: {
        temperature: 0.7,
      },
    });
    
    return response.text || "I'm not sure how to help right now, keep exploring!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The radio crackles... I can't hear you clearly. Keep trying!";
  }
}
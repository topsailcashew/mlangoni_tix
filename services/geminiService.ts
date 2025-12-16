import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Event } from '../types';

/**
 * SECURITY WARNING:
 * This implementation exposes the Gemini API key in the client-side bundle.
 * For production use, you MUST:
 * 1. Move API calls to a backend server
 * 2. Implement proper authentication and authorization
 * 3. Add rate limiting to prevent API abuse
 * 4. Never expose API keys in client-side code
 *
 * Current implementation is for DEMO purposes only.
 */

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error('Gemini API key is not configured. Please set GEMINI_API_KEY in .env.local');
      throw new Error('API key not configured');
    }

    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const askEventConcierge = async (
  question: string,
  currentEvent: Event | null
): Promise<string> => {
  try {
    const ai = getClient();
    
    let context = "You are SeatSavvy's helpful virtual event concierge. You help users decide if an event is right for them.";
    
    if (currentEvent) {
      context += `
      The user is asking about a specific event:
      Title: ${currentEvent.title}
      Date: ${currentEvent.date}
      Location: ${currentEvent.location}
      Price: $${currentEvent.price}
      Description: ${currentEvent.longDescription}
      
      Answer the user's question based on this information. Be enthusiastic and helpful. If the answer isn't in the details, make a reasonable assumption based on the type of event or suggest they contact the organizer. Keep answers short and punchy (under 50 words).
      `;
    } else {
      context += `
      The user is asking a general question. We sell tickets for concerts, workshops, and conferences. Encourage them to browse our catalog.
      `;
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: context }] },
        { role: 'user', parts: [{ text: question }] }
      ],
    });

    return response.text || "I'm having trouble connecting to the event database right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I can't answer that right now. Please try again later.";
  }
};
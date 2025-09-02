
import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";
import type { GeneratedResult } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("Missing Google Gemini API Key");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const virtualTryOn = async (personImage: File, outfitImage: File): Promise<GeneratedResult> => {
  try {
    const personBase64 = await fileToBase64(personImage);
    const outfitBase64 = await fileToBase64(outfitImage);

    const personImagePart = {
      inlineData: {
        data: personBase64,
        mimeType: personImage.type,
      },
    };

    const outfitImagePart = {
      inlineData: {
        data: outfitBase64,
        mimeType: outfitImage.type,
      },
    };

    const textPart = {
      text: "You are a virtual stylist. Analyze the person in the first image and the outfit in the second image. Generate a new, photorealistic image showing the person from the first image wearing the complete outfit from the second image. Maintain the person's pose, body shape, and the original background as much as possible. The resulting image should look natural and seamless.",
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [personImagePart, outfitImagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    let imageUrl: string | null = null;
    let text: string | null = null;
    
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          text = part.text;
        } else if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          const mimeType = part.inlineData.mimeType;
          imageUrl = `data:${mimeType};base64,${base64ImageBytes}`;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("The AI could not generate an image. Please try a different set of photos.");
    }

    return { imageUrl, text };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate virtual try-on: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the AI service.");
  }
};

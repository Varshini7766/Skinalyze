
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    condition: {
      type: Type.STRING,
      description: "The most likely skin condition identified. Examples: 'Appears Normal', 'Possible Eczema', 'Acne Vulgaris', 'Suspected Fungal Infection'. Use cautious, non-clinical language.",
    },
    description: {
      type: Type.STRING,
      description: "A brief, neutral, visual description of the skin in the image. Focus on what you see (e.g., 'redness, small bumps, dry patches').",
    },
    confidence: {
      type: Type.NUMBER,
      description: "A confidence score from 0.0 to 1.0 for the identified condition.",
    },
    isNormal: {
      type: Type.BOOLEAN,
      description: "True if the condition is 'Appears Normal', otherwise false.",
    },
    cautionary_note: {
      type: Type.STRING,
      description: "A mandatory, fixed disclaimer: 'This is an AI-generated analysis and not a medical diagnosis. Consult a healthcare professional for any health concerns.'",
    },
  },
  required: ["condition", "description", "confidence", "isNormal", "cautionary_note"],
};

export const analyzeSkinImage = async (base64ImageData: string): Promise<AnalysisResult> => {
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64ImageData,
    },
  };

  const textPart = {
    text: "Analyze this image of a skin area. Based on visual evidence, identify the most likely condition or determine if it appears normal. Provide a brief description, a confidence score, and a mandatory cautionary note. Structure your response strictly according to the provided JSON schema."
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
    config: {
      systemInstruction: "You are an AI assistant designed for preliminary visual analysis of skin images. Your purpose is to identify potential common dermatological conditions from images. You are NOT a medical professional. Your analysis must be cautious and descriptive. Do not provide medical advice, treatment plans, or diagnoses. Your response must be in JSON format.",
      responseMimeType: "application/json",
      responseSchema: analysisSchema,
    }
  });

  const jsonText = response.text.trim();
  try {
    const result = JSON.parse(jsonText);
    return result as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse JSON response from AI:", jsonText);
    throw new Error("The AI returned an invalid response format.");
  }
};

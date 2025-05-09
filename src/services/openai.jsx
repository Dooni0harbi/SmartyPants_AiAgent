
import OpenAI from "openai";
import { createContext, useContext, useState } from "react";


export const OpenAIContext = createContext();

export function OpenAIProvider({ children }) {
  const [client, setClient] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initialize = (apiKey) => {
    const newClient = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // This flag allows OpenAI to run in the browser (if needed).
    });
    setClient(newClient);
    setIsInitialized(true);
  };

  const chat = async (messages) => {
    if (!client) {
      throw new Error("OpenAI client not initialized");
    }

    try {
      const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw error;
    }
  };

  // Add transcribe method to handle audio transcription using Whisper
  const transcribe = async (audioFile) => {
    if (!client) {
      throw new Error("OpenAI client not initialized");
    }

    try {
      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("model", "whisper-1");

      const response = await client.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-1",
      });

      return response.text;
    } catch (error) {
      console.error("Whisper API Error:", error);
      throw new Error("Transcription failed. Please check the file and try again.");
    }
  };

  // Expose the context with both chat and transcribe functions
  return (
    <OpenAIContext.Provider value={{ isInitialized, initialize, chat, transcribe, OpenAIContext }}>
      {children}
    </OpenAIContext.Provider>
  );
}

// ✅ create and export the context

// ✅ hook to consume the context


// Hook to consume the OpenAI context
export function useOpenAI() {
  const context = useContext(OpenAIContext);
  if (!context) {
    throw new Error("useOpenAI must be used within an OpenAIProvider");
  }
  return context;
}

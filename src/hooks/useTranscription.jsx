// src/hooks/useTranscription.jsx
import { useApp } from "../context/AppContext";
import { toastErrorNotify } from "../helper/ToastNotify";
import { useOpenAI } from "../services/openai"; // Use OpenAI SDK
import useChat from "./useChat";
export const useTranscription = () => {
  const { addTranscription, state } = useApp();
  const { client } = useOpenAI(); // Access OpenAI client to interact with Whisper API
  const { sendMessage } = useChat(); // Use the sendMessage hook to send the transcribed text to the chatbot

  const transcribe = async (file) => {
    if (!client) {
      toastErrorNotify("OpenAI client not initialized");
      return;
    }

    try {
      // Step 1: Transcribe audio file using Whisper
      const response = await client.audio.transcriptions.create({
        file: file,  // The file from the upload
        model: "whisper-1",
      });

      const text = response.text; // Extract the transcribed text

      // Step 2: Send transcribed text to the chatbot
      const chatbotResponse = await sendMessage(text);

      // Add both transcription and chatbot response to state
      addTranscription({ fileName: file.name, text });
      addTranscription({ fileName: file.name, text: chatbotResponse });

      return text; // Return the transcribed text
    } catch (err) {
      toastErrorNotify("Error transcribing audio");
      console.error(err);
      throw err;
    }
  };

  return { transcribe };
};

export default useTranscription;

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useOpenAI } from "../../services/openai";
import { useApp } from "../../context/AppContext";
import { useAudio } from "../../context/AudioContext";
import ProgressIndicator from "./ProgressIndicator";
import useChat from "../../hooks/useChat";

const TranscriptionComponent = () => {
  const { sendMessage } = useChat();
  const { transcribe } = useOpenAI();
  const { isRecording, audioBlob, startRecording, stopRecording } = useAudio();
  const { addTranscription } = useApp();
  const [chatReply, setChatReply] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAudioUpload = async (file) => {
    if (!file) {
      toast.error("No audio file to transcribe!");
      return;
    }

    setIsTranscribing(true);

    try {
      const text = await transcribe(file);
      if (!text) {
        toast.error("Transcription result was empty");
        setIsTranscribing(false);
        return;
      }

      toast.success("Audio transcribed successfully!");
      setTranscription(text);
      addTranscription(text);

      const reply = await sendMessage(text);
      setChatReply(reply);
      toast.success("Chatbot responded!");
    } catch (error) {
      toast.error("Failed to transcribe or get chatbot reply");
      console.error("Error:", error);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="p-4">
      <div className="buttons-container mb-4 space-x-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded text-white ${
            isRecording ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {/* Audio playback for recorded audio */}
      {audioBlob && !isRecording && (
        <div className="audio-player-container mb-4">
          <audio controls src={URL.createObjectURL(audioBlob)} />
        </div>
      )}

      <ProgressIndicator loading={isTranscribing} />

      {/* Upload recorded audio for transcription */}
      {audioBlob && !isRecording && (
        <button
          onClick={() => handleAudioUpload(new File([audioBlob], "recording.wav", { type: "audio/wav" }))}
          className="upload-button px-4 py-2 bg-blue-600 text-white rounded mr-4"
        >
          Transcribe Recorded Audio
        </button>
      )}

      {/* File upload input */}
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {selectedFile && (
        <button
          onClick={() => handleAudioUpload(selectedFile)}
          className="upload-button px-4 py-2 bg-purple-600 text-white rounded"
        >
          Transcribe Uploaded Audio
        </button>
      )}

      {transcription && (
        <div className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-800 dark:text-white">
          <h3 className="font-semibold mb-2">Transcription Result:</h3>
          <p>{transcription}</p>
        </div>
      )}

      {chatReply && (
        <div className="mt-4 p-4 border rounded bg-blue-50 dark:bg-gray-700 dark:text-white">
          <h3 className="font-semibold mb-2">Chatbot Response:</h3>
          <p>{chatReply}</p>
        </div>
      )}
    </div>
  );
};

export default TranscriptionComponent;


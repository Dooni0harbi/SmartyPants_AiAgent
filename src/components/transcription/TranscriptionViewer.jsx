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

      {/* Card for recorded audio playback and transcription button */}
      {audioBlob && !isRecording && (
        <div className="card-shadow rounded-lg p-4 mb-4 animate-pulseRGB bg-white dark:bg-gray-900">
          <audio controls src={URL.createObjectURL(audioBlob)} className="w-full mb-4" />
          <button
            onClick={() =>
              handleAudioUpload(new File([audioBlob], "recording.wav", { type: "audio/wav" }))
            }
            className="upload-button px-4 py-2 bg-blue-600 text-white rounded"
          >
            Transcribe Recorded Audio
          </button>
        </div>
      )}

      {/* Card for uploaded audio transcription button */}
      {selectedFile && (
        <div className="card-shadow-fuchsia rounded-lg p-4 mb-4 animate-pulseRGB bg-white dark:bg-gray-900">
          <button
            onClick={() => handleAudioUpload(selectedFile)}
            className="upload-button px-4 py-2 bg-purple-600 text-white rounded"
          >
            Transcribe Uploaded Audio
          </button>
        </div>
      )}

      <ProgressIndicator loading={isTranscribing} />

      {/* File upload input */}
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Transcription Result Card */}
      {transcription && (
        <div className="card-shadow rounded-lg p-4 mt-6 bg-gray-50 dark:bg-gray-800 dark:text-white">
          <h3 className="font-semibold mb-2">Transcription Result:</h3>
          <p>{transcription}</p>
        </div>
      )}

      {/* Chatbot Response Card */}
      {chatReply && (
        <div className="card-shadow-fuchsia rounded-lg p-4 mt-4 bg-blue-50 dark:bg-gray-700 dark:text-white">
          <h3 className="font-semibold mb-2">Chatbot Response:</h3>
          <p>{chatReply}</p>
        </div>
      )}
    </div>
  );
};

export default TranscriptionComponent;

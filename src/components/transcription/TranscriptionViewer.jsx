import React, { useState } from "react";
import { toast } from "react-toastify";
import { useOpenAI } from "../../services/openai";
import { useApp } from "../../context/AppContext";
import { useAudio } from "../../context/AudioContext";
import ProgressIndicator from "./ProgressIndicator";
import useChat from "../../hooks/useChat";
import Lottie from "lottie-react";
import soundAnimation from "../../assets/sound.json"; // adjust path accordingly

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
    <div className="p-4 space-y-6">

      {/* Voice Recorder Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 card-shadow animate-pulseRGB">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Voice Recorder
        </h2>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-3 rounded text-white font-medium transition-colors ${
            isRecording ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>

        {isRecording && (
          <div className="mt-6 w-32 mx-auto">
            <Lottie animationData={soundAnimation} loop={true} />
          </div>
        )}

        {audioBlob && !isRecording && (
          <>
            <div className="mt-6">
              <audio controls src={URL.createObjectURL(audioBlob)} className="w-full" />
            </div>
            <button
              onClick={() =>
                handleAudioUpload(new File([audioBlob], "recording.wav", { type: "audio/wav" }))
              }
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Transcribe Recorded Audio
            </button>
          </>
        )}
      </div>

      {/* Upload Audio Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 card-shadow-fuchsia animate-pulseRGB">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Upload Audio File
        </h2>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        {selectedFile && (
          <button
            onClick={() => handleAudioUpload(selectedFile)}
            className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Transcribe Uploaded Audio
          </button>
        )}
      </div>

      {/* Transcription Result Card */}
      {transcription && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-gray-900 dark:text-white card-shadow">
          <h3 className="text-lg font-semibold mb-2">Transcription Result:</h3>
          <p>{transcription}</p>
        </div>
      )}

      {/* Chatbot Response Card */}
      {chatReply && (
        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 text-gray-900 dark:text-white card-shadow-fuchsia">
          <h3 className="text-lg font-semibold mb-2">Chatbot Response:</h3>
          <p>{chatReply}</p>
        </div>
      )}

      <ProgressIndicator loading={isTranscribing} />
    </div>
  );
};

export default TranscriptionComponent;

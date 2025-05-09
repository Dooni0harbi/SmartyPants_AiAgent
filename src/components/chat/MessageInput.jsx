import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useChat } from "../../hooks/useChat";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { dispatch } = useApp();
  const { sendMessage } = useChat();

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      // Add user's message to conversation
      dispatch({
        type: "ADD_CONVERSATION",
        payload: { message: text, isUser: true },
      });

      // Send message to AI and get reply
      const reply = await sendMessage(text);

      // Add AI's reply to conversation
      dispatch({
        type: "ADD_CONVERSATION",
        payload: { message: reply, isUser: false },
      });

      setText(""); // Clear input
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex p-4 gap-2">
      <input
        className="flex-1 border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;

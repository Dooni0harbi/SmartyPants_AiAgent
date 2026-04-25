import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useChat } from "../../hooks/useChat";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const { dispatch } = useApp();
  const { sendMessage } = useChat();

  const handleSend = async () => {
    if (!text.trim() || sending) return;
    const userMessage = text.trim();
    setText("");
    setSending(true);
    try {
      dispatch({ type: "ADD_CONVERSATION", payload: { message: userMessage, isUser: true } });
      const reply = await sendMessage(userMessage);
      dispatch({ type: "ADD_CONVERSATION", payload: { message: reply, isUser: false } });
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex p-3 gap-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <input
        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message… (Enter to send)"
        disabled={sending}
      />
      <button
        onClick={handleSend}
        disabled={sending || !text.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
      >
        {sending ? "…" : "Send"}
      </button>
    </div>
  );
};

export default MessageInput;

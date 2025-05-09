import React, { useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import Message from "./Message";

const MessageList = () => {
  const { state } = useApp();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.conversations]);

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col">
      {state.conversations.map((msg, index) => (
        <Message key={index} message={msg.message} isUser={msg.isUser} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;



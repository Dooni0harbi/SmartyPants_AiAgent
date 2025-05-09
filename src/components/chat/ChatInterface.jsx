import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatInterface = () => {
  return (
    <div className="flex flex-col h-screen">
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatInterface;



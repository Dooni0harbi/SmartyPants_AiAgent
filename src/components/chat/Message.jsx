import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ message, isUser }) => {
  return (
    <div
      className={`p-3 m-2 rounded-lg max-w-[80%] ${
        isUser
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  );
};

export default Message;

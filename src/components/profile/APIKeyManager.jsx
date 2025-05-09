import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";



const APIKeyManager = () => {
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey);
      setIsEditing(false);
      toast.success("API key saved successfully!");
    } else {
      toast.error("API key cannot be empty.");
    }

  };
 

  const handleDelete = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
    setIsEditing(false);
    toast.info("API key deleted.");
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">API Key Management</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        If you don't have an API key, you can get one from{" "}
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          here
          

        </a>
        
        .
      </p>
{/* //row and content chat with gpt  */}
      {!apiKey ? (
        <div>
          <p className="text-sm text-red-500 mt-2">No API key set. Please add one below.</p>
          <input
            type="text"
            placeholder="Enter your OpenAI API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
          />
          <button
            onClick={handleSave}
            className="mt-2 p-2 bg-blue-500 text-white rounded-md"
          >
            Save API Key
          </button>
        </div>
      ) : (
        <div>
          <p className="mt-2">Your current API key is set.</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 p-2 bg-yellow-500 text-white rounded-md"
          >
            Edit API Key
          </button>
          <button
            onClick={handleDelete}
            className="mt-2 p-2 bg-red-500 text-white rounded-md"
          >
            Delete API Key
          </button>
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Edit your OpenAI API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="p-2 w-full border rounded-md"
          />
          <button
            onClick={handleSave}
            className="mt-2 p-2 bg-green-500 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default APIKeyManager;


export const useChat = () => {
    const { chat, isInitialized } = useOpenAI();
  
    const sendMessage = async (message) => {
      if (!isInitialized) {
        throw new Error("API key not set.");
      }
  
      // Ensure that message is a valid string before sending
      if (!message || typeof message !== "string") {
        throw new Error("Invalid message content");
      }
  
      try {
        const reply = await chat([{ role: "user", content: message }]);
        return reply;
      } catch (err) {
        toastErrorNotify("Error sending message");
        console.error("Error sending message:", err);
        throw err;
      }
    };
  
    return { sendMessage };
  };
  
  export default useChat;
  
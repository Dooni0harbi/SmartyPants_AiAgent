import { createContext, useContext, useReducer } from "react";

// Creating AppContext to be used across the app
const AppContext = createContext();

// Initial state with theme, API key, conversations, and transcriptions
const initialState = {
  theme: localStorage.getItem("theme") || "light",
  conversations: JSON.parse(localStorage.getItem("conversations")) || [], // Load conversations from localStorage
  transcriptions: JSON.parse(localStorage.getItem("transcriptions")) || [], // Load transcriptions from localStorage
};

// Reducer function to handle different actions
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      // Save the theme to localStorage
      localStorage.setItem("theme", action.payload);
      return { ...state, theme: action.payload };

    case "ADD_CONVERSATION":
    
      // Add conversation to the state and store it in localStorage
      const updatedConversations = [...state.conversations, action.payload];
      localStorage.setItem("conversations", JSON.stringify(updatedConversations));
      return { ...state, conversations: updatedConversations };

    case "CLEAR_CONVERSATIONS":
      // Clear conversations from the state and localStorage
      localStorage.removeItem("conversations");
      return { ...state, conversations: [] };

    case "ADD_TRANSCRIPTION":
      // Add transcription to the state and store it in localStorage
      const updatedTranscriptions = [...state.transcriptions, action.payload];
      localStorage.setItem("transcriptions", JSON.stringify(updatedTranscriptions));
      return { ...state, transcriptions: updatedTranscriptions };

    case "CLEAR_TRANSCRIPTIONS":
      // Clear transcriptions from the state and localStorage
      localStorage.removeItem("transcriptions");
      return { ...state, transcriptions: [] };

    default:
      return state;
  }
};

// AppContextProvider component to wrap around the app and provide state and actions
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions for managing state
  const setTheme = (theme) => dispatch({ type: "SET_THEME", payload: theme });

  const addConversation = (conversation) =>
    dispatch({ type: "ADD_CONVERSATION", payload: conversation });

  const clearConversations = () =>
    dispatch({ type: "CLEAR_CONVERSATIONS" });

  const addTranscription = (transcription) =>
    dispatch({ type: "ADD_TRANSCRIPTION", payload: transcription });

  const clearTranscriptions = () =>
    dispatch({ type: "CLEAR_TRANSCRIPTIONS" });

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        setTheme,
        addConversation,
        clearConversations,
        addTranscription,
        clearTranscriptions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use AppContext easily
export const useApp = () => useContext(AppContext);

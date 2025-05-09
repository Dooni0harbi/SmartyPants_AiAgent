
// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { AppContextProvider } from "./context/AppContext";
import { AudioProvider } from "./context/AudioContext"; // Import AudioProvider
import AppRouter from "./router/AppRouter";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import TopNavBar from "./components/navbar/TopNavbar";
import { OpenAIProvider, useOpenAI } from "./services/openai"; 

// OpenAIInitializer definition remains the same
function OpenAIInitializer() {
  const { initialize } = useOpenAI();
  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      initialize(storedApiKey);
    }
  }, []);

  return null;
}

function App() {
  return (
    <div className="dark:bg-gray-dark-main">
      <AuthContextProvider>
        <AppContextProvider>
          <AudioProvider> {/* Wrap your app in the AudioProvider */}
            <OpenAIProvider>
              <OpenAIInitializer />
              <BrowserRouter>
                <TopNavBar />
                <AppRouter />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeButton={true}
                  rtl={false}
                  pauseOnFocusLoss={false}
                  closeOnClick
                  toastClassName="bg-gray-800 text-white text-sm rounded-lg shadow-lg"
                  bodyClassName="text-lg font-medium"
                  progressClassName="bg-blue-500"
                />
              </BrowserRouter>
            </OpenAIProvider>
          </AudioProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

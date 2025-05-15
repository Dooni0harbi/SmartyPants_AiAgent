// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import ChatInterface from "../components/chat/ChatInterface";
// import TranscriptionComponent from "../components/transcription/TranscriptionViewer";
// import APIKeyManager from "../components/profile/APIKeyManager";
// import MainLayout from "../components/shared/MainLayout";
// import { useApp } from "../context/AppContext";
// // import animateIntro from "../assets/animateIntro.json";
// import smart from "../assets/smart.json";
// import Lottie from "lottie-react";

// import robot from "../assets/Robot.png";

// const Home = () => {
//   const { currentUser, loading } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("chat");
//   const { transcriptions } = useApp();

//   useEffect(() => {
//     if (loading) return;
//     if (currentUser) {
//       setActiveTab("chat");
//       navigate("/chat");
//     }
//   }, [currentUser, loading, navigate]);

//   if (loading) {
//     return (
//       <div className="text-center mt-10 text-gray-700 dark:text-gray-300">
//         Loading...
//       </div>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
//          {/* <img 
//         src={robot} 
//         alt="AI Agent Logo" 
//         className="w-40 h-auto mb-6"  
//       /> */}
//                 <div className="w-48 h-48 flex items-center justify-center">
//   <Lottie
//     // animationData={animateIntro}
//     animationData={smart}
//     loop={true}
//     autoplay={true}
//     style={{ width: "100%", height: "100%" }}
//   />
// </div>
         
  
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
//           Welcome to Smarty Pants AI
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
//           Sign in or register to start chatting with your AI assistant!
//         </p>

//         <div className="flex space-x-6">
//           <Link
//             to="/login"
//             className="p-6 w-40 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg transition duration-300 hover:scale-105 shadow-cyan-500/50 dark:shadow-cyan-400/40"
//           >
//             <span className="block text-lg font-semibold text-gray-800 dark:text-white">
//               Sign In
//             </span>
//           </Link>

//           <Link
//             to="/register"
//             className="p-6 w-40 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg transition duration-300 hover:scale-105 shadow-fuchsia-500/50 dark:shadow-fuchsia-400/40"
//           >
//             <span className="block text-lg font-semibold text-gray-800 dark:text-white">
//               Register
//             </span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
//       <MainLayout>
//         <div className="w-full max-w-3xl">
//           {/* Lottie Animation */}
//           {/* <div className="flex justify-center mb-6"> */}
//          {/* </div> */}
//           {/* Heading */}
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
//             Welcome to Smarty Pants AI Chatbot Page
//           </h1>

//           {/* Tab Navigation */}
//           <div className="mb-4 flex justify-center space-x-4">
//             <button
//               className={`px-4 py-2 rounded-md ${
//                 activeTab === "chat"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
//               }`}
//               onClick={() => setActiveTab("chat")}
//             >
//               Chat
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md ${
//                 activeTab === "transcription"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
//               }`}
//               onClick={() => setActiveTab("transcription")}
//             >
//               Transcription
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md ${
//                 activeTab === "profile"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
//               }`}
//               onClick={() => setActiveTab("profile")}
//             >
//               Profile
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
//             {activeTab === "chat" && <ChatInterface />}
//             {activeTab === "transcription" && <TranscriptionComponent />}
//             {activeTab === "profile" && <APIKeyManager />}
//           </div>
//         </div>
//       </MainLayout>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ChatInterface from "../components/chat/ChatInterface";
import TranscriptionComponent from "../components/transcription/TranscriptionViewer";
import APIKeyManager from "../components/profile/APIKeyManager";
import MainLayout from "../components/shared/MainLayout";
import { useApp } from "../context/AppContext";
import smart from "../assets/smart.json";
import bubble from "../assets/bubble.json";
import Lottie from "lottie-react";

// Helper function to generate style for each bubble
const generateRandomStyle = () => {
  const size = Math.floor(Math.random() * 50) + 30; // 30-80px
  const left = Math.floor(Math.random() * 100); // 0%-100%
  const delay = Math.random() * 10; // 0-10s
  const duration = 15 + Math.random() * 10; // 15-25s

  return {
    left: `${left}%`,
    bottom: `-100px`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };
};

const Home = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat");
  const { transcriptions } = useApp();

  useEffect(() => {
    if (!loading && currentUser) {
      setActiveTab("chat");
      navigate("/chat");
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Floating Bubbles Layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up rounded-full opacity-70"
              style={generateRandomStyle()}
            >
              <Lottie animationData={bubble} loop autoplay />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
          {/* Left Column */}
          <div className="text-left md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Welcome to Smarty Pants AI
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              Sign in or register to start chatting with your AI assistant!
            </p>

            <div className="flex space-x-6">
              <Link
                to="/login"
                className="p-6 w-40 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg transition duration-300 hover:scale-105 shadow-cyan-500/50 dark:shadow-cyan-400/40"
              >
                <span className="block text-lg font-semibold text-gray-800 dark:text-white">
                  Sign In
                </span>
              </Link>

              <Link
                to="/register"
                className="p-6 w-40 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg transition duration-300 hover:scale-105 shadow-fuchsia-500/50 dark:shadow-fuchsia-400/40"
              >
                <span className="block text-lg font-semibold text-gray-800 dark:text-white">
                  Register
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Animation */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-[400px] h-[400px]">
              <Lottie animationData={smart} loop autoplay />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <MainLayout>
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Welcome to Smarty Pants AI Chatbot Page
          </h1>

          {/* Tab Navigation */}
          <div className="mb-4 flex justify-center space-x-4">
            {["chat", "transcription", "profile"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md capitalize ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
            {activeTab === "chat" && <ChatInterface />}
            {activeTab === "transcription" && <TranscriptionComponent />}
            {activeTab === "profile" && <APIKeyManager />}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Home;

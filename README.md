AI Agent 
A modern, feature-rich AI assistant application built with React, Vite, and Firebase that integrates with OpenAI's API to provide chat capabilities and audio transcription.

Features
🤖 AI Chat Interface: Have conversations with OpenAI's GPT-4o-mini model
🎙️ Audio Transcription: Convert audio files and recorded audio to text using OpenAI's Whisper API a
🎙️ The Chat bot reply on the transcripted audio
🔑 API Key Management: Securely store and manage your OpenAI API key
🔐 User Authentication: Email/password and Google sign-in with Firebase
🌓 Dark/Light Mode: Toggle between dark and light themes with persistent preferences
📱 Responsive Design: Collapsible sidebar and adaptive layouts for all devices
🔄 Persistent State: Conversations and settings are saved in local storage
📝 Markdown Support: AI responses support markdown formatting

Tech Stack
Frontend Framework: React 19
Build Tool: Vite 6
Authentication: Firebase Authentication
Styling: Tailwind CSS 4 with dark mode support
Router: React Router 7
State Management: React Context API with useReducer
API Integration: OpenAI API (GPT-4o-mini, Whisper)
Data Fetching: TanStack Query (React Query)
Notifications: React Toastify
Markdown Support: React Markdown
Icons: Heroicons
UI Components: Headless UI
Prerequisites

Features in Detail
Authentication
The application uses Firebase Authentication to provide:

Email and password authentication
Google Sign-in integration
User profile management
Protected routes for authenticated users
Automatic redirection based on authentication status

Chat Interface
The chat interface allows users to:

Start new conversations with the AI
Send messages and receive AI responses
View conversation history
Display markdown-formatted responses
Auto-scroll to the latest messages

The audio transcription feature enables users to:

Upload audio files (MP3, WAV, M4A) via drag-and-drop or file selection
Transcribe audio to text using OpenAI's Whisper API
Record an audio , and listen to it before Transcription
get notify transcription status (processing, completed, error)
Ai Chat reply on the text 

Theme Management
The application supports both dark and light themes:

Theme can be toggled with a dedicated button
UI components adapt to the current theme
Smooth transitions between themes

Responsive Layout
The application features a responsive design:

Collapsible sidebar for desktop
Mobile-friendly menu
Adaptive layouts for different screen sizes
Touch-friendly UI elements
API Key Management
Users can manage their OpenAI API keys in the profile section:

API keys are securely stored in local storage
Keys can be added, updated, and removed
Key validation before saving
Visual feedback for key status
State Management
The application uses React Context with useReducer for state management:

App Context
Manages application state including:

Conversations and messages
Transcriptions
User profile (API keys)
Theme preference
Auth Context
Handles authentication state:

Current user information
Login/signup functionality
Google authentication
Logout functionality

The link to the App :
https://smartypants0aiagent.netlify.app


Preview 
App Demo 


![smartypants0](https://github.com/user-attachments/assets/0fd4e9fd-1b69-4f41-a852-3271ad304539)


https://github.com/user-attachments/assets/96942681-a3b9-47f9-a576-abf5ad933fdc

https://github.com/user-attachments/assets/7f11a034-fbc1-40d9-8d6c-f56e1e079524



https://github.com/user-attachments/assets/dd6b6a97-1eb2-4899-a66c-c83df3c5766e








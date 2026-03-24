# TalentBridge 🚀

TalentBridge is a comprehensive and modern platform designed for seamless technical interviews, pair programming, and collaborative problem-solving. It bridges the gap between talent and opportunities by providing a unified environment with real-time code execution, live video calling, and interactive chat.

## 🌟 Features

*   **Real-time Collaborative Coding:** Features a powerful code editor powered by **Monaco Editor** and **Yjs**, allowing multiple users to write and edit code simultaneously with zero latency.
*   **Integrated Video & Audio Calling:** High-quality, reliable, and real-time video communication built on **GetStream.io**, enabling face-to-face interaction during coding sessions.
*   **Live Code Execution:** Write and execute code in multiple languages directly within the browser, utilizing the **Piston API** for secure and fast output generation.
*   **Practice Problem Library:** A curated set of coding challenges (Easy, Medium, Hard) complete with descriptions, examples, and constraints to help users sharpen their skills.
*   **Secure Authentication & User Management:** Handled efficiently via **Clerk**, ensuring privacy and secure access to user dashboards and sessions.
*   **Event-Driven Architecture:** Employs **Inngest** for reliable background jobs and event handling.
*   **Responsive & Beautiful UI:** Developed with **React**, **Vite**, **TailwindCSS**, and **DaisyUI** for a sleek, dark-mode ready, and highly responsive user experience.
*   **Interactive Chat:** In-session chat support to share links, snippets, or quick messages.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** React 19 with Vite
*   **Styling:** Tailwind CSS V4 & DaisyUI
*   **Editor & Collaboration:** `@monaco-editor/react`, `yjs`, `y-webrtc`
*   **Communication:** `@stream-io/video-react-sdk`, `stream-chat-react`
*   **State Management & Fetching:** React Query (`@tanstack/react-query`)
*   **Routing:** React Router v7

### Backend
*   **Runtime & Framework:** Node.js & Express.js
*   **Database:** MongoDB via Mongoose
*   **Authentication:** `@clerk/express`
*   **Background Jobs:** Inngest
*   **Communication Services:** Server SDKs for Stream (`@stream-io/node-sdk`, `stream-chat`)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with npm or yarn.

### 1. Clone the repository
```bash
git clone https://github.com/PratyushJaiswal999/Talent-Bridge.git
cd Talent-Bridge
```

### 2. Install Dependencies
You can install dependencies for both the frontend and backend using the root script:
```bash
npm run build
```
*(Alternatively, you can manually `cd` into the frontend and backend directories and run `npm install`)*

### 3. Environment Variables
You need to set up environment variables for both the frontend and backend. 

**Backend (`backend/.env`)**
Create an `.env` file in the `backend` directory and add the following keys:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
INNGEST_EVENT_KEY=your_inngest_key
CLIENT_URL=http://localhost:5173
```

**Frontend (`frontend/.env`)**
Create an `.env` file in the `frontend` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=http://localhost:3000
```

### 4. Running the Application Locally

**Start the Backend:**
```bash
cd backend
npm run dev
```

**Start the Frontend:**
```bash
cd frontend
npm run dev
```

The application will be running at `http://localhost:5173`.

## 📸 Overview
*   **Dashboard:** View your past and active interview sessions.
*   **Problems Page:** Browse and select problems to solve or use as interview questions.
*   **Session Environment:** A dedicated workspace split into a real-time collaborative editor on the left and a video/chat communication panel on the right.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check out the [issues page](https://github.com/PratyushJaiswal999/Talent-Bridge/issues).

## 📄 License
This project is licensed under the ISC License.

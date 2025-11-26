import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";


const app = express();
const __dirname = path.resolve();
// CORS – allow Vercel frontend to call backend
// --- middlewares and CORS (single robust CORS setup) ---
app.use(express.json());

// build allowed origins (dev + production)
const devFrontend = ENV.CLIENT_URL || "http://localhost:5173";
const extraAllowedOrigins = [
  "https://talent-bridge-blush.vercel.app"
];
const allowedOrigins = [devFrontend, ...extraAllowedOrigins].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (curl, mobile, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed by server"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};

// apply CORS once (before routes)
app.use(cors(corsOptions));
// handle preflight requests

app.use(clerkMiddleware()); // this adds auth field to request objects : req.auth()



app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chat",chatRoutes)
app.use("/api/sessions",sessionRoutes)

// test routes
app.get("/", (req, res) => {
  res.send("TalentBridge backend is running 🚀");
});



app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ msg: "Pratyush is UP and WORKING!!!!!" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}




// port config
const PORT = ENV.PORT || process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log("Server is running on PORT : ", PORT));
  }catch (error){
    console.error("❌ Error starting the server",error)
  }
};

startServer();

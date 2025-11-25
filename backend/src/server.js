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

// CORS – allow Vercel frontend to call backend
app.use(
  cors({
    origin: ["https://talent-bridge-blush.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// middlewares
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(clerkMiddleware()); //this adds auth field to request objects : req.auth()



app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chat",chatRoutes)
app.use("/api/sessions",sessionRoutes)

// test routes
app.get("/", (req, res) => {
  res.send("TalentBridge backend is running 🚀");
});



app.get("/pratyush", (req, res) => {
  res
    .status(200)
    .json({ msg: "Pratyush is UP and WORKING!!!!!" });
});
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

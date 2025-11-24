import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import {serve} from "inngest/express";


const app = express();

// CORS – allow Vercel frontend to call backend
app.use(
  cors({
    origin: ["https://talent-bridge-blush.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// middlewares
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))


app.use("api/inngest",server({client:inngest,functions}))

// test routes
app.get("/", (req, res) => {
  res.send("TalentBridge backend is running 🚀");
});

app.get("/jaiswal", (req, res) => {
  res.status(200).json({ msg: "This is from jaiswal's" });
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

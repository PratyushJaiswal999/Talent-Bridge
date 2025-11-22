import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

// middlewares
app.use(express.json());

// test routes
app.get("/", (req, res) => {
  res.send("TalentBridge backend is running 🚀");
});

app.get("/jaiswal", (req, res) => {
  res.status(200).json({ msg: "This is from jaiswal's" });
});

app.get("/pratyush", (req, res) => {
  res.status(200).json({ msg: "Pratyush is UP and WORKING!!!!!" });
});

// ❌ NO production block, NO frontend/dist, NO sendFile

const PORT = ENV.PORT || process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running on port:", PORT));

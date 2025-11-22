import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";

const app = express();

// middlewares (add more as you need)
app.use(express.json());

// just to test backend root
app.get("/", (req, res) => {
  res.send("TalentBridge backend is running 🚀");
});

// your test routes
app.get("/jaiswal", (req, res) => {
  res.status(200).json({ msg: "This is from jaiswal's" });
});

app.get("/pratyush", (req, res) => {
  res
    .status(200)
    .json({ msg: "Pratyush is UP and WORKING!!!!!" });
});

// ❌ IMPORTANT: no express.static, no frontend/dist, no index.html here

// Port – make sure Render can override it
const PORT = ENV.PORT || process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});

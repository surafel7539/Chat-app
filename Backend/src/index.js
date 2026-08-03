import express from "express";
import cors from 'cors';
import path from "path";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js";
import { messageRoutes } from "./routes/messages.routes.js";
import connectDB from "./LIB/db.js";
import { ENV } from "./LIB/env.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 5000;
const app = express();

// 🚀 CRITICAL RE-ORDER FIX: Place CORS and Cookie Parser at the absolute top!
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(cookieParser()); // 👈 This MUST sit above json() and urlencoded() configurations!

// Standard body parameter transformers
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server running on port: " + PORT);
    });
  } catch (error) {
    console.error("Failed to start the server due to database error:", error);
    process.exit(1);
  }
};

startServer();

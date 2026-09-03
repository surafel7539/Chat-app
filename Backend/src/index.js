import express from "express";
import cors from 'cors';
import path from "path";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js";
import { messageRoutes } from "./routes/messages.routes.js";
import connectDB from "./LIB/db.js";
import { ENV } from "./LIB/env.js";
import { server, app } from "./LIB/socketio.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 5000;



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatapp123-six.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser()); 


app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log("Server running on port: " + PORT);
    });
  } catch (error) {
    console.error("Failed to start the server due to database error:", error);
    process.exit(1);
  }
};

startServer();

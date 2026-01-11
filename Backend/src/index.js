import express from "express";

import path from "path";
import cookieParser from 'cookie-parser'

import authRoutes from "./routes/auth.routes.js";
import {messageRoutes} from "./routes/messages.routes.js";
import  connectDB  from "./LIB/db.js";
import { ENV } from "./LIB/env.js";


const __dirname = path.resolve();

const PORT = ENV.PORT || 5000;

const app = express();

app.use(express.json()); // req.body

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});
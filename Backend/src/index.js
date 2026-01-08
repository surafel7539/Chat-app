import express from "express";
import dotenv from "dotenv";
import path from "path";
import { authroutes } from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use("/api/auth", authroutes);
const __dirname = path.resolve();


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}


app.listen(port, () => {
  console.log(`running on port: ${port}`);
});

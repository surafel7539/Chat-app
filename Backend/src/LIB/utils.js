import jwt from "jsonwebtoken";
import { ENV } from "../LIB/env.js"; 

const generateToken = (userId, res) => {

  
  const token = jwt.sign(
    { userId },
    ENV.JWT_SECRET, 
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "strict",
    secure: false, // 👈 FIX: Explicitly set to false so localhost HTTP accepts it!
  });

  return token;
};

export default generateToken;

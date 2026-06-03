// auth.routes.js
import express from "express";
import { login, logout,  signup, updateProfile } from "../controllers/auth.controllers.js";  // note the {}
import { protectionRoute } from "../middleware/auth.middleware.js";
import arcjetProtection from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",arcjetProtection, login);
router.post("/logout", logout);
router.put("/update-profile", protectionRoute ,updateProfile);
router.get('/check', protectionRoute, (req, res)=> res.status(200).json(req.user))

export default router;

import jwt from 'jsonwebtoken'
import User from '../modules/User.js'
import { ENV } from '../LIB/env.js'

export const protectionRoute = async (req, res, next) => {
    try {
        
       
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ message: "Unauthorized - No token provided" });

        const decode = jwt.verify(token, ENV.JWT_SECRET);
        if (!decode) return res.status(401).json({ message: "Unauthorized - Invalid Token" });

        // CRITICAL FIX: Added 'await' to resolve the database lookup
        const user = await User.findById(decode.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        
        req.user = user;

        next();
    } catch (error) {
        console.error('Error in protection route middleware:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

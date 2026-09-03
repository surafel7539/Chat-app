import User from "../modules/User.js"
import bcrypt from 'bcrypt'
import generateToken  from "../LIB/utils.js"
import { sendWelcomeEmail } from "../emails/emailHandlers.js"
import 'dotenv/config'
import {ENV} from '../LIB/env.js'
import cloudinary from "../LIB/cloudinary.js"

export const signup = async (req, res) =>{
    const {username, email, password} = req.body

    try {
        if(!username || !password || !email){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 8){
            return res.status(400).json({message:"Password must be at least 8 characters"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"})
        }
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"email already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        if(newUser){
            await newUser.save()

            
            generateToken(newUser._id, res)
            
            
            res.status(201).json({
                _id:newUser._id,
                username:newUser.username,
                email:newUser.email,
                profilepic:newUser.profilepic
            })

            try {
               
                await sendWelcomeEmail(newUser.email, newUser.username, ENV.CLIENT_URL)
            } catch (error) {
                console.error(`Error sending welcome email: ${error}`);
            }
        } else {
            res.status(400).json({message:"invalid user data"})
        }
    } catch (error) {
        console.error("an error occured during signup:", error);
        res.status(500).json({message:"an error occured"})
    }
}

export const login  = async (req, res) => {
    const { email, password } = req.body

    try {
        
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message:"Invalid input"})
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password) 
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid input"})

        
        generateToken(user._id, res)

        return res.status(200).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            profilepic:user.profilepic
        })
        
    } catch (error) {
        console.error('Error in login process:', error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const logout = (req, res) => {
    
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true, sameSite: "lax" });
    res.status(200).json({ message: "User logged out successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

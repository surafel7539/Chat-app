import User from "../modules/User.js"
import bcrypt from 'bcrypt'
import generateToken  from "../LIB/utils.js"
import { sendWelcomeEmail } from "../emails/emailHandlers.js"
import 'dotenv/config'
import {ENV} from '../LIB/env.js'


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
                await sendWelcomeEmail(newUser.email, newUser.name,ENV.CLIENT_URL)
            } catch (error) {
                console.error(`Error sending the email: ${error}`);
            }
        }else{
            res.status(400).json({message:"invalid user data"})
        }
    } catch (error) {
        console.error("an error occured:", error);
        res.status(500).json({message:"an error occured"})
        
    }
}

export const login  = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message:"Invalid input"})
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password) 
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid input"})

        generateToken(user._id, res)

         res.status(200).json({
                _id:user._id,
                username:user.username,
                email:user.email,
                profilepic:user.profilepic
            })
        
    } catch (error) {
        console.error('Error in login process', error);
        res.status(500).json({message:"Internal Server Error"})
        
    }
}
export const logout = (req, res) => {
    
    res.cookie("jwt", "", { maxAge: 0});
    
    
    res.status(200).json({ message: "User logged out successfully" });
};

export const updateProfile = async (req, res) => {

}
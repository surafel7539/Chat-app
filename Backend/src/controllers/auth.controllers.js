import User from "../modules/User.js"
import bcrypt from 'bcrypt'
import generateToken  from "../LIB/utils.js"

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
        }else{
            res.status(400).json({message:"invalid user data"})
        }
    } catch (error) {
        console.error("an error occured:", error);
        res.status(500).json({message:"an error occured"})
        
    }
}
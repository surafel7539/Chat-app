import express from 'express'
import { signup } from '../controllers/auth.controllers.js'


export const authroutes = express.Router()

authroutes.post('/signup', signup)
authroutes.get('/login', (req, res) =>{
    res.send('login point')
})
authroutes.get('/logout', (req, res) =>{
    res.send('logout point')
})


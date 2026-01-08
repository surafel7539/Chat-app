import express from 'express'

export const authroutes = express.Router()

authroutes.get('/signup', (req, res) =>{
    res.send('signup point')
})
authroutes.get('/login', (req, res) =>{
    res.send('login point')
})
authroutes.get('/logout', (req, res) =>{
    res.send('logout point')
})


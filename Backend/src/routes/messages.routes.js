import express from 'express'

export const authroutes = express.Router()

authroutes.get('/recieved', (req, res) =>{
    res.send('recieved point')
})
authroutes.get('/sent', (req, res) =>{
    res.send('sent point')
})
authroutes.get('/deleted', (req, res) =>{
    res.send('deleted point')
})


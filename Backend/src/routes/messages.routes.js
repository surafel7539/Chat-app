import express from 'express'

export const messageRoutes = express.Router()

messageRoutes.get('/recieved', (req, res) =>{
    res.send('recieved point')
})
messageRoutes.get('/sent', (req, res) =>{
    res.send('sent point')
})
messageRoutes.get('/deleted', (req, res) =>{
    res.send('deleted point')
})


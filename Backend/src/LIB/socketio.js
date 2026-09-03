import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

import { socketAuthMiddleware } from '../middleware/socketio.middleware.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: [
      "http://localhost:5173",
      "https://chatapp123-six.vercel.app",
    ],
    credentials: true,
    }
})

io.use(socketAuthMiddleware)

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId]
}    
const userSocketMap = {};

io.on("connection",(socket) => {
    console.log("A user Connected", socket.user.username);

    const userId = socket.userId

    

    userSocketMap[userId]= socket.id

    
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () =>{
        console.log("A user Disconnected", socket.user.username);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap));


    })

    
})

export {io, app, server}
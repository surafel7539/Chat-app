import express from 'express'
import { protectionRoute } from '../middleware/auth.middleware.js'
import { getAllContacts, getMessagesByUserId, sendMessages } from '../controllers/message.controller.js'

export const messageRoutes = express.Router()

messageRoutes.get('/contacts',protectionRoute, getAllContacts)
// messageRoutes.get('/chats', getChatPartners)
messageRoutes.get('/:id', protectionRoute, getMessagesByUserId)


messageRoutes.post('/send/:id',protectionRoute, sendMessages)


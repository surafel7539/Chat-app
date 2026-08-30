import express from 'express'
import { protectionRoute } from '../middleware/auth.middleware.js'
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessages, deleteMessage } from '../controllers/message.controller.js'

export const messageRoutes = express.Router()

messageRoutes.get('/contacts',protectionRoute, getAllContacts)
messageRoutes.get('/chats', protectionRoute, getChatPartners)
messageRoutes.get('/:id', protectionRoute, getMessagesByUserId)


messageRoutes.post('/send/:id',protectionRoute, sendMessages)
messageRoutes.delete("/:id",protectionRoute, deleteMessage);


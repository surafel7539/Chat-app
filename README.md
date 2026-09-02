# Telegram-inspired Chat Application 💬

A full-stack real-time chat application inspired by Telegram, built with **React.js** for the frontend and **Express.js** for the backend.

The application supports real-time messaging, online/offline presence, typing indicators, authentication, image sharing, email notifications, and more.

## ✨ Highlights

* 🔐 Custom JWT Authentication
* 💬 Real-time Messaging with Socket.io
* 🟢 Online/Offline Presence Indicators
* ⌨️ Real-time Typing Indicators
* 🔔 Notification & Typing Sounds with Toggle
* 📧 Welcome Emails on Signup with Resend
* 🖼️ Image Uploads with Cloudinary
* 🚀 REST API with Node.js & Express.js
* 🍃 MongoDB for Data Persistence
* 🛡️ API Rate Limiting powered by Arcjet
* 🎨 Responsive UI with React, Tailwind CSS & DaisyUI
* 🗃️ Zustand for State Management
* ☁️ Deployment with Sevalla

## 🛠️ Technologies Used

### Frontend

* React.js
* Tailwind CSS
* DaisyUI
* Zustand
* Socket.io Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io
* JWT

### Services

* Resend
* Cloudinary
* Arcjet
* Sevalla

## 🚀 Installation

### Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

### Install Frontend

```bash
cd frontend
npm install
npm run dev
```

### Install Backend

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3000

MONGO_URI=your_mongo_uri_here

NODE_ENV=development

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

## 📱 Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes

### Messaging

* Real-time messaging
* Image sharing
* Typing indicators
* Online/offline status
* Notification sounds
* Typing sounds

### Email

* Automatic welcome email when a user signs up
* Powered by Resend

### Security

* JWT authentication
* Password hashing
* API rate limiting with Arcjet
* Protected API routes

## 📂 Project Structure

```text
project/
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── src/
│   └── package.json
│
└── README.md
```

## 🎯 Project Status

**Completed ✅**

This project is a completed full-stack Telegram-inspired chat application featuring real-time communication and a modern responsive interface.



# Telegram-Clone/Chat Application 

A full-stack real-time chat application that has the basic functions of Telegram, built with **React.js** for the frontend and **Express.js** for the backend.

The application supports real-time messaging, online/offline presence, authentication, image sharing  and more.

##  Features:

* JWT Authentication
* Real-time Messaging with Socket.io
* Online/Offline Presence Indicators
* Welcome Emails on Signup with Resend(but it can only send it to my email, sorry😅)
* Image Uploads with Cloudinary
* REST API with Express.js
* MongoDB for Data Persistence
* API Rate Limiting powered by Arcjet
* Responsive UI with React, Tailwind CSS & DaisyUI
* Zustand for State Management
* Deployment with Vercel for the Frontend and Render For the Backend

## 🛠️ Technologies Used

### Frontend

* React.js
* Tailwind CSS
* DaisyUI
* Zustand
* Socket.io Client

### Backend

* Express.js
* MongoDB
* Mongoose
* Socket.io
* JWT

### Services

* Resend
* Cloudinary
* Arcjet
* Vercel
* Render

## Installation

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

## Environment Variables

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




This project is a completed full-stack Telegram-Clone/Chat Application featuring real-time communication and a modern responsive interface.

To the people reading this:
  I spent over 20hrs making this it is my first fullstack website and my first time using vercel and render too, but I couldnt have come up with the design by my self so the design is     inspired by another developer called: burakorkmez, He made a Youtube video you can see it using this link: https://youtu.be/bR4b_Io8shE and The repo is in his description, but i built   the backend by my self it was challenging but I did what I could, so I hope it is good enough.



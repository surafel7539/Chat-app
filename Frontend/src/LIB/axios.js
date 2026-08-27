import axios from'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "https://chat-app-ptjw.onrender.com/api",
    withCredentials: true,
})
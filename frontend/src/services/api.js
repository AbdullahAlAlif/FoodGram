import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true // Send cookies with each request
});

export default api;
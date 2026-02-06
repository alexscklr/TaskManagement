import axios from 'axios';

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:5131') + '/api'
});

//Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = "Ein Fehler ist aufgetreten.";

        if (error.response?.data?.errors) {
            message = Object.values(error.response.data.errors).flat().join(" ");
        } else if (error.response?.data?.Message) {
            message = error.response.data.Message;
        }

        console.error("API Error:", message);
        return Promise.reject(new Error(message));
    }
);
export default api;
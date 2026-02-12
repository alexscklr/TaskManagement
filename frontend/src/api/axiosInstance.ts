import axios from 'axios';

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:5131') + '/api'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // HIER NEU: Wenn 401 kommt, Token löschen und zum Login schicken
        if (error.response?.status === 401) {
            console.warn("Token abgelaufen oder ungültig. Logout...");
            localStorage.removeItem('token');
            // Nur umleiten, wenn wir nicht schon auf der Login-Seite sind
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }

        let message = "Ein Fehler ist aufgetreten.";
        // ... deine bisherige Fehler-Logik
        if (error.response?.data?.errors) {
            message = Object.values(error.response.data.errors).flat().join(" ");
        } else if (error.response?.data?.message) {
            message = error.response.data.message;
        }

        console.error("API Error:", message);
        return Promise.reject(new Error(message));
    }
);

export default api;
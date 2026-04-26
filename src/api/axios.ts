import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token)
            config.headers.Authorization = `Bearer ${token}`;

        console.log(`[API Request] ${config ? config?.method?.toUpperCase() : 'Some Error'} ${config.url}`, config.data);
        if (config.method === "get")
            config.params = { ...config.params, _t: Date.now() };
        return config;
    },
    (error) => { return Promise.reject(error); }
);


api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            originalRequest._retry = true;
            localStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(error);
        }
        
        if (error.response?.status === 403) {
            console.error('Access denied');
        }
        
        if (error.response?.status === 404) {
            console.error('Resourse not found');
        }

        if (error.response?.status >= 500) {
            console.error('Server error. Please try later');
        }

        if (!error.response) {
            console.error('Network error. Check your connection');
        }

        return Promise.reject(error);
    }
);

export default api;
import axios from 'axios';

import { ActiveUserState } from "../types/UserStateType";
import { useDispatch } from 'react-redux';
import { logout } from '../stores/slices/UserSlice';
// import { config } from 'process';

const apiAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

apiAuth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token)
            config.headers.Authorization = `Bearer ${token}`;


        console.log(`[API Request] ${config ? config?.method?.toUpperCase() : 'Some Error'} ${config.url}`, config.data);
        if (config.method === "get")
            config.params = { ...config.params, _t: Date.now() };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // localStorage.clear();
            useDispatch()(logout());
            window.location.href = '/login';
            return Promise.reject(error);
        }
        
        if (error.response?.status === 403) {
            console.error('Access denied');
        }
        
        if (error.response?.status === 404) {
            window.location.href = '/error/404';
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


export const authApi = {
    async login(phone: string, password: string): Promise<ActiveUserState> {
        const { data } = await apiAuth.post("/auth/login", { phone, password });
        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Token saved:', data.token); 
        }
        return data;
    },
    async register(phone: string, password: string, name?: string): Promise<ActiveUserState> {
        const { data } = await apiAuth.post("/auth/register", {
            phone,
            password,
            name,
        });
        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Token saved:', data.token); 
        }
        return data;
    },
    async getProfile() {
        const { data } = await apiAuth.get("/auth/profile");
        return data;
    },
    async updateProfile(fields: {
        name?: string;
        avatar?: string;
        city?: string;
    }) {
        const { data } = await apiAuth.patch("/auth/profile", fields);
        return data;
    },
};

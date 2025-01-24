import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        const status = error.response?.status || 500;
        throw new Error(`Error ${status}: ${message}`);
    } else {
        throw new Error('An unexpected error occurred');
    }
};

export const getData = async (endpoint: string) => {
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const postData = async (endpoint: string, data: any) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
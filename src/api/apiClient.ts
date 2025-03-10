// src/api/apiClient.ts
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        const status = error.response?.status || 500;
        const errorDetails = error.response?.data?.errors?.map((e: any) => e.msg).join(", ") || "";
        throw new Error(`${message}${errorDetails ? `: ${errorDetails}` : ""} (Status: ${status})`);
    } else {
        throw new Error("An unexpected error occurred");
    }
};

export const getData = async (endpoint: string) => {
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        handleError(error); // This will throw, no need to return
    }
};

export const postData = async (
    endpoint: string,
    data: any,
    config: { headers?: { "Content-Type"?: string } } = {} // Optional config with headers
) => {
    try {
        const response = await apiClient.post(endpoint, data, {
            ...config,
            headers: {
                ...config.headers, // Merge custom headers if provided
            },
        });
        return response.data;
    } catch (error) {
        handleError(error); // This will throw, no need to return
    }
};
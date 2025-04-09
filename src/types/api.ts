// Generic API response type
export interface ApiResponse<T> {
    data: T;
    success?: boolean;
    message?: string;
    token?: string;
}

// Login response type
export interface LoginResponse {
    token: string;
    data: User;
}

// Registration response type
export interface RegistrationResponse {
    success: boolean;
    message: string;
    data: User;
    token: string;
}

// User type for API responses
export interface User {
    _id: string;
    title?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: Record<string, unknown>;
    aadhaar?: { number?: string };
    voter?: { number?: string };
    dateOfBirth?: string;
    age?: number;
    occupation?: string;
    role?: string;
    status?: string;
    isVerified?: boolean;
    wallet?: Record<string, unknown>;
    membership?: Record<string, unknown> | null;
    professional?: Record<string, unknown> | null;
    referralCode?: string;
    referredBy?: Record<string, unknown>;
}

// Helper function to type API responses
export function asApiResponse<T>(response: unknown): ApiResponse<T> {
    return response as ApiResponse<T>;
} 
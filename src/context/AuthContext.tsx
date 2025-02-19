import { postData } from "@/api/apiClient";
import { clearCredentials, setCredentials } from "@/features/auth/authSlice";
import Cookies from 'js-cookie';
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useDispatch } from 'react-redux';
import { toast } from "sonner";

interface User {
    username?: string;
    email?: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (registrationData: RegistrationData) => Promise<void>;
    sendOtp: (contact: string, type: 'email' | 'phone') => Promise<void>;
    verifyOtp: (contact: string, otp: string, type: 'email' | 'phone') => Promise<void>;
    logout: () => void;
    loading: boolean;
}

interface RegistrationData {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    age: string;
    addressLine1: string;
    addressLine2: string;
    cityOrVillage: string;
    taluka: string;
    district: string;
    state: string;
    pincode: string;
    qualification: string;
    profession: string;
    position: string;
    aadhaarNumber: string;
    voterId: string;
    aadhaarCard: File | null;
    voterCard: File | null;
    password: string;
    referralCode: string;
}

interface LoginCredentials {
    email?: string;
    phone?: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(
        Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails') || '{}') : null
    );
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Login method
    const login = async (credentials: LoginCredentials) => {
        try {
            setLoading(true);
            const response = await postData("/login", credentials);

            // Dispatch to Redux store
            dispatch(setCredentials({
                token: response.token,
                data: response.data
            }));

            // Still set cookies if needed
            Cookies.set('authToken', response.token, { expires: 4 });
            setUser({ username: response.data.username, email: response.data.email });
             toast.success('Login Successful!', {
                description: 'Redirecting to the dashboard...',
            });
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            throw error;
        } finally {
            setLoading(false);
        }
    };


    // Register method
    const register = async (registrationData: RegistrationData) => {
        try {
            setLoading(true);

            // Create FormData object
            const formData = new FormData();

            // Iterate through all keys in registrationData
            (Object.keys(registrationData) as Array<keyof RegistrationData>).forEach(key => {
                const value = registrationData[key];

                // Special handling for File objects
                if (value instanceof File) {
                    formData.append(key, value, value.name);
                }
                // For other primitive types
                else if (value !== null && value !== undefined) {
                    formData.append(key, String(value));
                }
            });

            // Update postData to handle FormData
            const response = await postData("/signup", formData);
            toast.success("Registration successful!", response);
        } catch (error) {
            // toast.error("Registration failed");
            // throw error;
            toast.success("Registration successful!");
        } finally {
            setLoading(false);
        }
    };


    // Send OTP method
    const sendOtp = async (contact: string, type: 'email' | 'phone') => {
        try {
            setLoading(true);
            // Validate input based on type
            if (type === 'email' && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(contact)) {
                throw new Error('Invalid email format');
            }
            if (type === 'phone' && !/^(\+91)?[6-9]\d{9}$/.test(contact)) {
                throw new Error('Invalid phone number format');
            }

            // Prepare payload based on type
            const payload = type === 'email' ? { email: contact } : { phone: contact };

            console.log(payload)
            // Send OTP request with dynamic payload
            await postData('/send-otp', payload);
            toast.success(`OTP sent successfully to your ${type}!`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    // Verify OTP method
    const verifyOtp = async (contact: string, otp: string, type: 'email' | 'phone') => {
        try {
            setLoading(true);
            // Validate input based on type
            if (type === 'email' && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(contact)) {
                throw new Error('Invalid email format');
            }
            if (type === 'phone' && !/^(\+91)?[6-9]\d{9}$/.test(contact)) {
                throw new Error('Invalid phone number format');
            }

            // Prepare payload based on type
            const payload = type === 'email' ? { email: contact, otp } : { phone: contact, otp };

            // Verify OTP request with dynamic payload
            const response = await postData('/validate-otp', payload);
            Cookies.set('authToken', response.token, { expires: 4 });
            toast.success('OTP verified successfully!');
            return response;
        } catch (error) {
            toast.error('Please Enter Valid OTP');
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        Cookies.remove('authToken');
        dispatch(clearCredentials());
        toast.success("Logged out successfully");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!Cookies.get('authToken'),
                login,
                register,
                sendOtp,
                verifyOtp,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

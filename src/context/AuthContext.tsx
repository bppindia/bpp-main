import { postData } from "@/api/apiClient";
import { clearCredentials, setCredentials } from "@/features/auth/authSlice";
import Cookies from "js-cookie";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface User {
  lastName: any;
  firstName: any;
  referralCode: string;
  username?: string;
  email?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (registrationData: RegistrationData) => Promise<void>;
  sendOtp: (identifier: string) => Promise<void>;
  verifyOtp: (identifier: string, otp: string) => Promise<void>;
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
  age: number | string;
  addressLine1: string;
  addressLine2: string;
  cityOrVillage: string;
  district: string;
  state: string;
  pincode: string;
  qualification: string;
  profession: string;
  position: string;
  aadhaarNumber: string;
  voterId: string;
  aadhaarFront: File | null;
  aadhaarBack: File | null;
  voterFront: File | null;
  voterBack: File | null;
  password: string;
  confirmPassword?: string;
  referralCode: string;
  identifier: string;
  otp: string;
}

interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(
    Cookies.get("userDetails") ? JSON.parse(Cookies.get("userDetails") || "{}") : null
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await postData("/auth/login", credentials);
      dispatch(setCredentials({ token: response.token, data: response.data }));
      Cookies.set("authToken", response.token, { expires: 4 });
      Cookies.set("userDetails", JSON.stringify(response.data), { expires: 4 });
      setUser({ username: response.data.username, email: response.data.email, phone: response.data.phone });
      toast.success("Login Successful!", { description: "Redirecting to the dashboard..." });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      const errorDetails = error.response?.data?.errors?.map((e: any) => e.msg).join(", ") || "";
      toast.error(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (registrationData: RegistrationData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      (Object.keys(registrationData) as Array<keyof RegistrationData>).forEach((key) => {
        const value = registrationData[key];
        if (key === "confirmPassword") return; // Skip confirmPassword
        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const response = await postData("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(setCredentials({ token: response.token, data: response.data }));
      Cookies.set("authToken", response.token, { expires: 4 });
      Cookies.set("userDetails", JSON.stringify(response.data), { expires: 4 });
      setUser({ 
        email: response.email, 
        phone: response.phone,
        username: response.firstName ? `${response.firstName} ${response.lastName || ''}`.trim() : undefined 
      });
      toast.success("Registration successful!", { description: "Welcome aboard!" });
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      const errorDetails = error.response?.data?.errors?.map((e: any) => e.msg).join(", ") || "";
      toast.error(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (identifier: string) => {
    try {
      setLoading(true);
      const payload = { identifier };
      await postData("/auth/register/send-otp", payload); // Fixed endpoint
      toast.success(`OTP sent successfully to your ${identifier.includes("@") ? "email" : "phone"}!`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to send OTP";
      const errorDetails = error.response?.data?.errors?.map((e: any) => e.msg).join(", ") || "";
      toast.error(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (identifier: string, otp: string) => {
    try {
      setLoading(true);
      const payload = { identifier, otp };
      await postData("/auth/register/verify-otp", payload);
      toast.success("OTP verified successfully!");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to verify OTP";
      const errorDetails = error.response?.data?.errors?.map((e: any) => e.msg).join(", ") || "";
      toast.error(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userDetails");
    setUser(null);
    dispatch(clearCredentials());
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!Cookies.get("authToken"),
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
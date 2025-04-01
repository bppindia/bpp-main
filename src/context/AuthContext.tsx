// AuthContext.tsx
import { postData } from "@/api/apiClient";
import { clearCredentials, setCredentials } from "@/store/authSlice";
import Cookies from "js-cookie";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function isFile(value: unknown): value is File {
  return value instanceof File ||
    (typeof value === 'object' &&
      value !== null &&
      'name' in value &&
      'size' in value &&
      'type' in value);
}

interface User {
  _id: string;
  title?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    cityOrVillage?: string;
    district?: string;
    state?: string;
    pincode?: string;
  };
  aadhaar?: string;
  voter?: string;
  dateOfBirth?: string;
  age?: number;
  occupation: string;
  role: string;
  status: string;
  isVerified: boolean;
  wallet?: string;
  membership?: string;
  professional?: string | null;
  referralCode?: string;
  referredBy?: string;
}

interface RegistrationData {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  addressLine1?: string;
  addressLine2?: string;
  cityOrVillage?: string;
  district?: string;
  state?: string;
  pincode?: string;
  qualification?: string;
  profession?: string;
  position?: string;
  aadhaarNumber?: string;
  voterId?: string;
  aadhaarFront?: File | null;
  aadhaarBack?: File | null;
  voterFront?: File | null;
  voterBack?: File | null;
  password?: string;
  referralCode?: string;
  identifier?: string;
  otp?: string;
}

interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
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
  updateVerification: (isVerified: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userDetails = Cookies.get("userDetails");
    return userDetails ? JSON.parse(userDetails) : null;
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await postData("/auth/login", credentials);
      const userData: User = response.data;
      dispatch(setCredentials({ token: response.token, data: userData }));
      Cookies.set("authToken", response.token, { expires: 4, secure: true, sameSite: "strict" });
      Cookies.set("userDetails", JSON.stringify(userData), { expires: 4, secure: true, sameSite: "strict" });
      setUser(userData);
      toast.success("Login Successful!", { description: "Redirecting to the dashboard..." });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (registrationData: RegistrationData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      const {
        addressLine1,
        addressLine2,
        cityOrVillage,
        district,
        state,
        pincode,
        aadhaarFront,
        aadhaarBack,
        voterFront,
        voterBack,
        ...rest
      } = registrationData;

      // Only append non-empty fields
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, isFile(value) ? value : String(value));
        }
      });

      // Append address fields if they exist
      if (addressLine1) formData.append("addressLine1", addressLine1);
      if (addressLine2) formData.append("addressLine2", addressLine2);
      if (cityOrVillage) formData.append("cityOrVillage", cityOrVillage);
      if (district) formData.append("district", district);
      if (state) formData.append("state", state);
      if (pincode) formData.append("pincode", pincode);

      // Append files if they exist
      if (aadhaarFront) formData.append("aadhaarFront", aadhaarFront);
      if (aadhaarBack) formData.append("aadhaarBack", aadhaarBack);
      if (voterFront) formData.append("voterFront", voterFront);
      if (voterBack) formData.append("voterBack", voterBack);

      const response = await postData("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.success) {
      const userData: User = {
        _id: response.data._id,
        title: response.data.title,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address,
        aadhaar: response.data.aadhaar?.number,
        voter: response.data.voter?.number,
        dateOfBirth: response.data.dateOfBirth,
        age: response.data.age,
        occupation: response.data.occupation,
        role: response.data.role || "MEMBER",
        status: response.data.status || "PROCESSING",
        isVerified: response.data.isVerified || false,
        wallet: response.data.wallet,
        membership: response.data.membership,
        professional: response.data.professional || null,
        referralCode: response.data.referralCode || "",
        referredBy: response.data.referredBy || undefined,
      };

      dispatch(setCredentials({ token: response.token, data: userData }));
      Cookies.set("authToken", response.token, { expires: 4, secure: true, sameSite: "strict" });
      Cookies.set("userDetails", JSON.stringify(userData), { expires: 4, secure: true, sameSite: "strict" });
      setUser(userData);

      
      toast.success(response.message || "Registration Successful!");

      return response
    } else {
      throw new Error(response.message || "Registration completed");
    }
  } catch (error: any) {
    console.error("Registration error:", error);
    toast.error(error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};

  const sendOtp = async (identifier: string) => {
    try {
      setLoading(true);
      await postData("/auth/register/send-otp", { identifier });
      toast.success(`OTP sent successfully to your ${identifier.includes("@") ? "email" : "phone"}!`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to send OTP";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (identifier: string, otp: string) => {
    try {
      setLoading(true);
      await postData("/auth/register/verify-otp", { identifier, otp });
      toast.success("OTP verified successfully!");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to verify OTP.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
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

  const updateVerification = (isVerified: boolean) => {
    if (user) {
      const updatedUser = { ...user, isVerified };
      setUser(updatedUser);
      Cookies.set("userDetails", JSON.stringify(updatedUser), { expires: 4, secure: true, sameSite: "strict" });
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      Cookies.set("userDetails", JSON.stringify(updatedUser), { expires: 4, secure: true, sameSite: "strict" });
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await postData("/users/me", {});
      const userData: User = response.data;
      setUser(userData);
      Cookies.set("userDetails", JSON.stringify(userData), { expires: 4, secure: true, sameSite: "strict" });
      dispatch(setCredentials({ token: Cookies.get("authToken")!, data: userData }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch user data.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
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
        updateVerification,
        updateUser,
        fetchUserData,
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
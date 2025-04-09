// Define a shared User interface for both AuthContext and Redux store
export interface User {
  _id?: string;
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
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
  occupation?: string;
  role?: string;
  status?: string;
  isVerified?: boolean;
  wallet?: string;
  membership?: string;
  professional?: string | null;
  referralCode?: string;
  referredBy?: string;
  [key: string]: unknown; // Allow for additional properties
}

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegistrationData {
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
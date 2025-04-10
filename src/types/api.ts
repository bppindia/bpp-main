// Generic API response type
export interface ApiResponse<T> {
  data: T
  success?: boolean
  message?: string
  token?: string
}

// Login response type
export interface LoginResponse {
  token: string
  data: User
}

// Registration response type
export interface RegistrationResponse {
  success: boolean
  message: string
  data: User
  token: string
}

// User type for API responses
export interface User {
  _id: string
  title?: string
  firstName: string
  middleName?: string
  lastName: string
  email: string
  phone: string
  address?: {
    line1?: string
    line2?: string
    cityOrVillage?: string
    district?: string
    state?: string
    pincode?: string
  }
  aadhaar?: {
    number?: string
    front?: string
    back?: string
  }
  voter?: {
    number?: string
    front?: string
    back?: string
  }
  dateOfBirth?: string
  age?: number
  occupation?: string
  role?: string
  status?: string
  isVerified?: boolean
  wallet?: {
    _id: string
    user: string
    balance: number
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
  membership?: {
    _id: string
    user: string
    type: string
    status: string
    amount: number
    cardUrl?: string
    validity: {
      startDate: string
      expiryDate: string
    }
    membershipNumber: string
    renewals: unknown[]
    createdAt: string
    updatedAt: string
  }
  professional?: {
    _id: string
    user: string
    qualification?: string
    profession?: string
    position?: string
    createdAt: string
    updatedAt: string
  } | null
  referralProfile?: {
    _id: string
    user: string
    referralCode: string
    referralLink: string
    totalReferrals: number
    successfulReferrals: number
    pendingReferrals: number
    createdAt: string
    updatedAt: string
  } | null
  referredBy?: User | null
  createdAt?: string
  updatedAt?: string
}

// Helper function to type API responses
export function asApiResponse<T>(response: unknown): ApiResponse<T> {
  return response as ApiResponse<T>
}

export interface DashboardData {
  user: {
    firstName: string
    lastName: string
    role: string
    status: string
    isVerified?: boolean
    address: {
      line1?: string
      line2?: string
      cityOrVillage?: string
      district?: string
      state?: string
      pincode?: string
    }
    referredBy: {
      id: string
      firstName: string
      lastName: string
    } | null
  }
  // ... existing code ...
}

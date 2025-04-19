import React, { createContext, ReactNode, useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { clearCredentials, setCredentials } from '@/store/authSlice'
import {
  LoginResponse,
  RegistrationResponse,
  asApiResponse,
  User as ApiUser,
  Session,
} from '@/types/api'
import {
  User as AuthUser,
  LoginCredentials,
  RegistrationData,
  LoginResponseData,
} from '@/types/auth'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { postData, getData, deleteData } from '@/api/apiClient'

// Types
interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (registrationData: RegistrationData) => Promise<void>
  sendOtp: (identifier: string) => Promise<void>
  verifyOtp: (identifier: string, otp: string) => Promise<void>
  logout: () => void
  loading: boolean
  updateVerification: (isVerified: boolean) => void
  updateUser: (updates: Partial<AuthUser>) => void
  fetchUserData: () => Promise<void>
  getActiveSessions: () => Promise<Session[]>
  revokeSession: (sessionId: string) => Promise<void>
  revokeAllOtherSessions: () => Promise<void>
}

interface CookieOptions {
  expires: number
  secure: boolean
  sameSite: 'strict' | 'lax' | 'none'
}

// Constants
const COOKIE_OPTIONS: CookieOptions = {
  expires: 4,
  secure: true,
  sameSite: 'strict',
}

const COOKIE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DETAILS: 'userDetails',
  SESSION_ID: 'sessionId',
} as const

// Utility functions
const isFile = (value: unknown): value is File => {
  return (
    value instanceof File ||
    (typeof value === 'object' &&
      value !== null &&
      'name' in value &&
      'size' in value &&
      'type' in value)
  )
}

const getErrorMessage = (error: unknown): string => {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response &&
    error.response.data &&
    typeof error.response.data === 'object' &&
    'message' in error.response.data
  ) {
    return String(error.response.data.message)
  }
  return error && typeof error === 'object' && 'message' in error
    ? String(error.message)
    : 'An unexpected error occurred'
}

const setCookie = (key: string, value: string | object): void => {
  const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value
  Cookies.set(key, valueToStore, COOKIE_OPTIONS)
}

const removeCookie = (key: string): void => {
  Cookies.remove(key)
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const userDetails = Cookies.get(COOKIE_KEYS.USER_DETAILS)
    return userDetails ? JSON.parse(userDetails) : null
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleAuthSuccess = (token: string, userData: AuthUser, sessionId?: string): void => {
    dispatch(setCredentials({ token, user: userData }))
    setCookie(COOKIE_KEYS.AUTH_TOKEN, token)
    setCookie(COOKIE_KEYS.USER_DETAILS, userData)
    if (sessionId) {
      setCookie(COOKIE_KEYS.SESSION_ID, sessionId)
    }
    setUser(userData)
  }

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setLoading(true)
      const response = await postData<LoginResponse>(
        '/auth/login',
        credentials as unknown as Record<string, unknown>
      )
      const typedResponse = asApiResponse<LoginResponse>(response)
      const responseData = typedResponse.data as unknown as LoginResponseData
      const userData = responseData.user as unknown as AuthUser

      if (!responseData.accessToken) {
        throw new Error('No token received from server')
      }

      handleAuthSuccess(responseData.accessToken, userData, responseData.sessionId)
      toast.success('Login Successful!', {
        description: 'Redirecting to the login page...',
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const register = async (
    registrationData: RegistrationData
  ): Promise<void> => {
    try {
      setLoading(true)

      const formData = new FormData()
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
      } = registrationData

      // Append non-empty fields
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, isFile(value) ? value : String(value))
        }
      })

      // Append address fields
      const addressFields = {
        addressLine1,
        addressLine2,
        cityOrVillage,
        district,
        state,
        pincode,
      }
      Object.entries(addressFields).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })

      // Append files
      const files = {
        aadhaarFront,
        aadhaarBack,
        voterFront,
        voterBack,
      }
      Object.entries(files).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })

      const response = await postData<RegistrationResponse>(
        '/auth/register',
        formData as unknown as Record<string, unknown>,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      const typedResponse = asApiResponse<RegistrationResponse>(response)

      if (typedResponse.success && typedResponse.token) {
        const userData = typedResponse.data as unknown as AuthUser
        handleAuthSuccess(typedResponse.token, userData)
        toast.success(typedResponse.message || 'Registration Successful!')
      } else {
        throw new Error(typedResponse.message || 'Registration failed')
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const sendOtp = async (identifier: string): Promise<void> => {
    try {
      setLoading(true)
      await postData('/auth/register/send-otp', { identifier })
      toast.success(
        `OTP sent successfully to your ${identifier.includes('@') ? 'email' : 'phone'}!`
      )
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (identifier: string, otp: string): Promise<void> => {
    try {
      setLoading(true)
      await postData('/auth/register/verify-otp', { identifier, otp })
      toast.success('OTP verified successfully!')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = (): void => {
    removeCookie(COOKIE_KEYS.AUTH_TOKEN)
    removeCookie(COOKIE_KEYS.USER_DETAILS)
    removeCookie(COOKIE_KEYS.SESSION_ID)
    setUser(null)
    dispatch(clearCredentials())
    toast.success('Logged out successfully')
  }

  const updateVerification = (isVerified: boolean): void => {
    if (user) {
      const updatedUser = { ...user, isVerified }
      setUser(updatedUser)
      setCookie(COOKIE_KEYS.USER_DETAILS, updatedUser)
    }
  }

  const updateUser = (updates: Partial<AuthUser>): void => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      setCookie(COOKIE_KEYS.USER_DETAILS, updatedUser)
    }
  }

  const fetchUserData = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await postData<{ data: ApiUser }>('/users/me', {})
      const typedResponse = asApiResponse<{ data: ApiUser }>(response)
      const userData = typedResponse.data as AuthUser

      const token = Cookies.get(COOKIE_KEYS.AUTH_TOKEN)
      if (!token) {
        throw new Error('No authentication token found')
      }

      handleAuthSuccess(token, userData)
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getActiveSessions = async (): Promise<Session[]> => {
    try {
      const response = await getData<{ success: boolean; data: Session[] }>('/auth/sessions/active')
      return response.data
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const revokeSession = async (sessionId: string) => {
    try {
      await deleteData<{ success: boolean; message: string }>(`/auth/sessions/${sessionId}`, {
        refreshToken: Cookies.get('refreshToken')
      })
      toast.success('Session revoked successfully')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const revokeAllOtherSessions = async () => {
    try {
      await deleteData<{ success: boolean; message: string }>('/auth/sessions/revoke-others', {
        refreshToken: Cookies.get('refreshToken')
      })
      toast.success('All other sessions revoked successfully')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!Cookies.get(COOKIE_KEYS.AUTH_TOKEN),
    login,
    register,
    sendOtp,
    verifyOtp,
    logout,
    loading,
    updateVerification,
    updateUser,
    fetchUserData,
    getActiveSessions,
    revokeSession,
    revokeAllOtherSessions,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

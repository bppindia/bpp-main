// AuthContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { clearCredentials, setCredentials } from '@/store/authSlice'
import {
  LoginResponse,
  RegistrationResponse,
  asApiResponse,
  User as ApiUser,
} from '@/types/api'
import {
  User as AuthUser,
  LoginCredentials,
  RegistrationData,
} from '@/types/auth'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { postData } from '@/api/apiClient'

function isFile(value: unknown): value is File {
  return (
    value instanceof File ||
    (typeof value === 'object' &&
      value !== null &&
      'name' in value &&
      'size' in value &&
      'type' in value)
  )
}

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const userDetails = Cookies.get('userDetails')
    return userDetails ? JSON.parse(userDetails) : null
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true)
      const response = await postData(
        '/auth/login',
        credentials as unknown as Record<string, unknown>
      )
      const typedResponse = asApiResponse<LoginResponse>(response)
      const userData: AuthUser = typedResponse.data as unknown as AuthUser

      if (!typedResponse.token) {
        throw new Error('No token received from server')
      }

      // Store user data with all populated fields
      dispatch(setCredentials({ token: typedResponse.token, user: userData }))
      Cookies.set('authToken', typedResponse.token, {
        expires: 4,
        secure: true,
        sameSite: 'strict',
      })
      Cookies.set('userDetails', JSON.stringify(userData), {
        expires: 4,
        secure: true,
        sameSite: 'strict',
      })
      setUser(userData)
      toast.success('Login Successful!', {
        description: 'Redirecting to the dashboard...',
      })
    } catch (_error: unknown) {
      const errorMessage =
        _error &&
        typeof _error === 'object' &&
        'response' in _error &&
        _error.response &&
        typeof _error.response === 'object' &&
        'data' in _error.response &&
        _error.response.data &&
        typeof _error.response.data === 'object' &&
        'message' in _error.response.data
          ? String(_error.response.data.message)
          : 'Login failed. Please check your credentials.'
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

      // Only append non-empty fields
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, isFile(value) ? value : String(value))
        }
      })

      // Append address fields if they exist
      if (addressLine1) formData.append('addressLine1', addressLine1)
      if (addressLine2) formData.append('addressLine2', addressLine2)
      if (cityOrVillage) formData.append('cityOrVillage', cityOrVillage)
      if (district) formData.append('district', district)
      if (state) formData.append('state', state)
      if (pincode) formData.append('pincode', pincode)

      // Append files if they exist
      if (aadhaarFront) formData.append('aadhaarFront', aadhaarFront)
      if (aadhaarBack) formData.append('aadhaarBack', aadhaarBack)
      if (voterFront) formData.append('voterFront', voterFront)
      if (voterBack) formData.append('voterBack', voterBack)

      const response = await postData(
        '/auth/register',
        formData as unknown as Record<string, unknown>,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      const typedResponse = asApiResponse<RegistrationResponse>(response)
      if (typedResponse.success) {
        const userData: AuthUser = typedResponse.data as unknown as AuthUser
        if (!typedResponse.token) {
          throw new Error('No token received from server')
        }
        dispatch(setCredentials({ token: typedResponse.token, user: userData }))
        Cookies.set('authToken', typedResponse.token, {
          expires: 4,
          secure: true,
          sameSite: 'strict',
        })
        Cookies.set('userDetails', JSON.stringify(userData), {
          expires: 4,
          secure: true,
          sameSite: 'strict',
        })
        setUser(userData)

        toast.success(typedResponse.message || 'Registration Successful!')
      } else {
        throw new Error(typedResponse.message || 'Registration completed')
      }
    } catch (_error: unknown) {
      // Error handling without console.log
      const errorMessage =
        _error && typeof _error === 'object' && 'message' in _error
          ? String(_error.message)
          : 'Registration failed'
      toast.error(errorMessage)
      throw _error
    } finally {
      setLoading(false)
    }
  }

  const sendOtp = async (identifier: string) => {
    try {
      setLoading(true)
      await postData('/auth/register/send-otp', { identifier })
      toast.success(
        `OTP sent successfully to your ${identifier.includes('@') ? 'email' : 'phone'}!`
      )
    } catch (_error: unknown) {
      const errorMessage =
        _error &&
        typeof _error === 'object' &&
        'response' in _error &&
        _error.response &&
        typeof _error.response === 'object' &&
        'data' in _error.response &&
        _error.response.data &&
        typeof _error.response.data === 'object' &&
        'message' in _error.response.data
          ? String(_error.response.data.message)
          : 'Failed to send OTP'
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (identifier: string, otp: string) => {
    try {
      setLoading(true)
      await postData('/auth/register/verify-otp', { identifier, otp })
      toast.success('OTP verified successfully!')
    } catch (_error: unknown) {
      const errorMessage =
        _error &&
        typeof _error === 'object' &&
        'response' in _error &&
        _error.response &&
        typeof _error.response === 'object' &&
        'data' in _error.response &&
        _error.response.data &&
        typeof _error.response.data === 'object' &&
        'message' in _error.response.data
          ? String(_error.response.data.message)
          : 'Failed to verify OTP.'
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove('authToken')
    Cookies.remove('userDetails')
    setUser(null)
    dispatch(clearCredentials())
    toast.success('Logged out successfully')
  }

  const updateVerification = (isVerified: boolean) => {
    if (user) {
      const updatedUser = { ...user, isVerified }
      setUser(updatedUser)
      Cookies.set('userDetails', JSON.stringify(updatedUser), {
        expires: 4,
        secure: true,
        sameSite: 'strict',
      })
    }
  }

  const updateUser = (updates: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      Cookies.set('userDetails', JSON.stringify(updatedUser), {
        expires: 4,
        secure: true,
        sameSite: 'strict',
      })
    }
  }

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await postData('/users/me', {})
      const typedResponse = asApiResponse<{ data: ApiUser }>(response)
      const userData: AuthUser = typedResponse.data as unknown as AuthUser

      // Store the complete user data with all populated fields
      setUser(userData)
      Cookies.set('userDetails', JSON.stringify(userData), {
        expires: 4,
        secure: true,
        sameSite: 'strict',
      })
      dispatch(
        setCredentials({ token: Cookies.get('authToken')!, user: userData })
      )
    } catch (_error: unknown) {
      const errorMessage =
        _error &&
        typeof _error === 'object' &&
        'response' in _error &&
        _error.response &&
        typeof _error.response === 'object' &&
        'data' in _error.response &&
        _error.response.data &&
        typeof _error.response.data === 'object' &&
        'message' in _error.response.data
          ? String(_error.response.data.message)
          : 'Failed to fetch user data.'
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

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
        updateVerification,
        updateUser,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

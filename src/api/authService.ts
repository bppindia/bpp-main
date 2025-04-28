import { asApiResponse } from '@/types/api'
import { postData } from './apiClient'

interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}

interface ForgotPasswordResponse {
  success: boolean
  message: string
}

interface ResetPasswordResponse {
  success: boolean
  message: string
}

export const authService = {
  forgotPassword: async (identifier: { email?: string; phone?: string }) => {
    try {
      const response = await postData<ApiResponse<ForgotPasswordResponse>>(
        '/auth/forgot-password',
        identifier
      )
      return asApiResponse(response)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw error
    }
  },

  resetPassword: async (data: {
    otp: string
    newPassword: string
    email?: string
    phone?: string
  }) => {
    try {
      const response = await postData<ApiResponse<ResetPasswordResponse>>(
        '/auth/reset-password',
        data
      )
      return asApiResponse(response)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw error
    }
  },
}

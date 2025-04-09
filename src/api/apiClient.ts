import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

const API_URL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

interface ApiError {
  message: string
  errors?: Array<{ msg: string }>
}

const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>
    const message = axiosError.response?.data?.message || axiosError.message
    const status = axiosError.response?.status || 500
    const errorDetails =
      axiosError.response?.data?.errors?.map((e) => e.msg).join(', ') || ''
    throw new Error(
      `${message}${errorDetails ? `: ${errorDetails}` : ''} (Status: ${status})`
    )
  }
  throw new Error('An unexpected error occurred')
}

export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(endpoint)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const postData = async <T>(
  endpoint: string,
  data: Record<string, unknown>,
  config: { headers?: { 'Content-Type'?: string } } = {}
): Promise<T> => {
  try {
    const response = await apiClient.post<T>(endpoint, data, {
      ...config,
      headers: {
        'Content-Type': config.headers?.['Content-Type'] || 'application/json',
        ...config.headers,
      },
    })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const putData = async <T>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await apiClient.put<T>(endpoint, data)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const deleteData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await apiClient.delete<T>(endpoint)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export default apiClient

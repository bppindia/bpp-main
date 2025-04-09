import { User } from '@/types/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    clearCredentials: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = state.user ? { ...state.user, ...action.payload } : null
    },
  },
})

export const { setCredentials, clearCredentials, updateUser } =
  authSlice.actions
export default authSlice.reducer

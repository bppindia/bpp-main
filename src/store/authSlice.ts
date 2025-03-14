import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    userData: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, data } = action.payload;
      state.token = token;
      state.userData = data;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
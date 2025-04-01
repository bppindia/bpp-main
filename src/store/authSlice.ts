import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  data: any;
}

const initialState: AuthState = {
  token: null,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; data: any }>) => {
      state.token = action.payload.token;
      state.data = action.payload.data;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.data = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
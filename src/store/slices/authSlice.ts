import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface Admin {
  email: string;
  role: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  token: string | null;
  admin: Admin | null;
  isAuthenticated: boolean;
}

const COOKIE_KEY = "admin_auth";

const loadFromCookie = (): AuthState => {
  try {
    const data = Cookies.get(COOKIE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to parse auth cookie:", err);
  }
  return { token: null, admin: null, isAuthenticated: false };
};

const initialState: AuthState = loadFromCookie();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; admin: Admin }>) {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      state.isAuthenticated = true;

      Cookies.set(COOKIE_KEY, JSON.stringify(state), {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });
    },
    logout(state) {
      state.token = null;
      state.admin = null;
      state.isAuthenticated = false;

      Cookies.remove(COOKIE_KEY);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

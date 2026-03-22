import { IAdmin } from "@/components/interface/admin.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  accessToken: string | null;
  admin: IAdmin | null;
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
  return { accessToken: null, admin: null };
};

const initialState: AuthState = loadFromCookie();

const authSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        accessToken: string;
        admin: IAdmin;
      }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.admin = action.payload.admin;

      Cookies.set(COOKIE_KEY, JSON.stringify(state), {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });
    },

    logout(state) {
      state.accessToken = null;
      state.admin = null;

      Cookies.remove(COOKIE_KEY);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

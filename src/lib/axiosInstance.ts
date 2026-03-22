import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import endpoints from "./endpoints";

// Base config for all requests
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

// Attach token only for admin requests
AxiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const { accessToken } = state.adminAuth;

    // Let Axios/Browser handle Content-Type for FormData (to include boundary)
    if (config.data instanceof FormData) {
      if (config.headers) {
        // Axios 1.x use AxiosHeaders object which has a delete method
        if (typeof config.headers.delete === "function") {
          config.headers.delete("Content-Type");
          config.headers.delete("content-type");
        } else {
          delete config.headers["Content-Type"];
          delete config.headers["content-type"];
        }
      }
    } else if (!config.headers || !config.headers["Content-Type"]) {
      if (config.headers) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // console.log(
    //   "➡️ [REQUEST]",
    //   config.method?.toUpperCase(),
    //   config.url,
    //   config.headers,
    // );
    return config;
  },
  (error) => Promise.reject(error),
);

AxiosInstance.interceptors.response.use(
  (res) => {
    // console.log("✅ [RESPONSE]", res.data);
    return res;
  },
  async (error) => {
    //   "❌ [RESPONSE ERROR]",
    // console.log(
    //   error.response?.status,
    //   error.response?.data,
    // );

    if (error.response?.status === 401) {
      // console.log("No refresh token, forcing logout");
      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;

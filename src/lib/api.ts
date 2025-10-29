import axios from "axios";
import store from "../store/store";
import { logout } from "../store/slices/authSlice";

// Base config for all requests
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// JSON instance (for public and admin)
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Multipart instance (for admin file uploads)
export const uploadApi = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

// Attach token only for admin requests
const attachAdminInterceptor = (instance: typeof api) => {
  instance.interceptors.request.use(
    (config) => {
      // Only attach token for /admin routes
      if (config.url && config.url.startsWith("/api/admin")) {
        const token = store.getState().auth.token;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );
};

attachAdminInterceptor(api);
attachAdminInterceptor(uploadApi);

export default api;

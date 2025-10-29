import api from "@/lib/api";
import { RegisterAdmin } from "@/lib/types";

export const requestOtp = async (formEmail: string) => {
  const email = { email: formEmail };
  const response = await api.post("/api/admin/auth/requestOtp", email);
  return response.data;
};

export const register = async (data: RegisterAdmin) => {
  const response = await api.post("/api/admin/auth/signup", data);
  return response.data;
};

export const signin = async (data: { email: string; password: string }) => {
  const response = await api.post("/api/admin/auth/login", data);
  return response.data;
};

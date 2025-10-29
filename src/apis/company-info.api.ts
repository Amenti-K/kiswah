import api from "@/lib/api";

export const getCompanyInfo = async () => {
  const res = await api.get("/api/public/company-info");
  return res.data;
};

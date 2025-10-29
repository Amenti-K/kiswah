import api, { uploadApi } from "@/lib/api";
import { Partner } from "@/lib/types/partner.types";
import type { PartnerType } from "@/lib/types/partner.types";

// Public
export const getPartners = async () => {
  const res = await api.get("/api/public/partners");
  return res.data;
};

// Admin
// Get all partners grouped by type
export const getAdminPartners = async () => {
  const res = await api.get("/api/admin/partners");
  return res.data;
};

// Create partner (with optional logo file)
export const createPartner = async (
  data: Omit<Partner, "id" | "logo">,
  file?: File
) => {
  if (file) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        formData.append(key, value as string);
    });
    formData.append("file", file);
    const res = await uploadApi.post("/api/admin/partners", formData);
    return res.data;
  } else {
    const res = await api.post("/api/admin/partners", data);
    return res.data;
  }
};

// Update partner (with optional logo file)
export const updatePartner = async (
  id: number,
  data: Partial<Omit<Partner, "id" | "logo">>,
  file?: File
) => {
  if (file) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        formData.append(key, value as string);
    });
    formData.append("file", file);
    const res = await uploadApi.put(`/api/admin/partners/${id}`, formData);
    return res.data;
  } else {
    const res = await api.put(`/api/admin/partners/${id}`, data);
    return res.data;
  }
};

// Delete partner
export const deletePartner = async (id: number) => {
  const res = await api.delete(`/api/admin/partners/${id}`);
  return res.data;
};

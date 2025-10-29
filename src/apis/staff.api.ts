import api from "@/lib/api";

// PUBLIC
export const getPublicStaffs = async () => {
  const res = await api.get("/api/public/staff");
  return res.data;
};

export const getStaffById = async (id: string) => {
  const res = await api.get(`/api/public/staff/${id}`);
  return res.data;
};

// ADMIN
export const getAdminStaffs = async () => {
  const res = await api.get("/api/admin/staff");
  return res.data;
};

export const createStaff = async (data: any) => {
  const res = await api.post("/api/admin/staff", data);
  return res.data;
};

export const updateStaff = async (id: string, data: any) => {
  const res = await api.put(`/api/admin/staff/${id}`, data);
  return res.data;
};

export const deleteStaff = async (id: string) => {
  const res = await api.delete(`/api/admin/staff/${id}`);
  return res.data;
};

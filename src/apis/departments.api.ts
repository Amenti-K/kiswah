import api from "@/lib/api";

// Public
export const getPublicDepartments = async () => {
  const res = await api.get("/api/public/departments");
  return res.data;
};

// Admin
export const getAdminDepartments = async () => {
  const res = await api.get("/api/admin/departments");
  return res.data;
};

export const createDepartment = async (department: {
  name: string;
  description: string;
  responsibilities: string[];
}) => {
  const res = await api.post("/api/admin/departments", department);
  return res.data;
};

export const updateDepartment = async (
  id: string,
  department: {
    name?: string;
    description?: string;
    responsibilities?: string[];
  }
) => {
  const res = await api.put(`/api/admin/departments/${id}`, department);
  return res.data;
};

export const deleteDepartment = async (id: string) => {
  const res = await api.delete(`/api/admin/departments/${id}`);
  return res.data;
};

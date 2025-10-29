import api from "@/lib/api";

export const getPublicProjects = async () => {
  const res = await api.get("/api/public/projects");
  return res.data;
};

export const getProjectById = async (id: string) => {
  const res = await api.get(`/api/public/projects/${id}`);
  return res.data;
};

// Admin APIs
export const getAdminProjects = async () => {
  const res = await api.get("/api/admin/projects");
  return res.data;
};

export const createProject = async (data: any) => {
  const res = await api.post("/api/admin/projects", data);
  return res.data;
};

export const updateProject = async (id: string, data: any) => {
  const res = await api.put(`/api/admin/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id: string) => {
  const res = await api.delete(`/api/admin/projects/${id}`);
  return res.data;
};

import api, { uploadApi } from "@/lib/api";
import {
  PersonnelResource,
  FacilityResource,
  EquipmentResource,
  CertificationResource,
} from "@/lib/types/resources.types";

// Public
export const getPublicResources = async () => {
  const res = await api.get("/api/public/resources");
  return res.data;
};

// Admin
export const getAdminResources = async () => {
  const res = await api.get("/api/admin/resources");
  return res.data;
};

// Personnel
export const createPersonnelResource = async (data: PersonnelResource) => {
  const res = await api.post("/api/admin/resources/personnel", data);
  return res.data;
};

export const updatePersonnelResource = async (
  id: number,
  data: Partial<PersonnelResource>
) => {
  const res = await api.put(`/api/admin/resources/personnel/${id}`, data);
  return res.data;
};

export const deletePersonnelResource = async (id: number) => {
  const res = await api.delete(`/api/admin/resources/personnel/${id}`);
  return res.data;
};

// Facilities
export const createFacilityResource = async (
  data: FacilityResource,
  file?: File
) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && key !== "capabilities")
      formData.append(key, value as string);
  });
  if (data.capabilities) {
    data.capabilities.forEach((cap) => formData.append("capabilities", cap));
  }
  if (file) formData.append("file", file);
  const res = await uploadApi.post("/api/admin/resources/facilities", formData);
  return res.data;
};

export const updateFacilityResource = async (
  id: number,
  data: Partial<FacilityResource>,
  file?: File
) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && key !== "capabilities")
      formData.append(key, value as string);
  });
  if (data.capabilities) {
    data.capabilities.forEach((cap) => formData.append("capabilities", cap));
  }
  if (file) formData.append("file", file);
  const res = await uploadApi.put(
    `/api/admin/resources/facilities/${id}`,
    formData
  );
  return res.data;
};

export const deleteFacilityResource = async (id: number) => {
  const res = await api.delete(`/api/admin/resources/facilities/${id}`);
  return res.data;
};

// Equipments
export const createEquipmentResource = async (
  data: EquipmentResource,
  file?: File
) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.imageType) formData.append("imageType", data.imageType);
  if (file) formData.append("file", file);
  const res = await api.post("/api/admin/resources/equipments", formData);
  return res.data;
};

export const updateEquipmentResource = async (
  id: number,
  data: Partial<EquipmentResource>,
  file?: File
) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.imageType) formData.append("imageType", data.imageType);
  if (file) formData.append("file", file);
  const res = await api.put(`/api/admin/resources/equipments/${id}`, formData);
  return res.data;
};

export const deleteEquipmentResource = async (id: number) => {
  const res = await api.delete(`/api/admin/resources/equipments/${id}`);
  return res.data;
};

// Certifications
export const createCertificationResource = async (
  data: CertificationResource,
  file?: File
) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.imageType) formData.append("imageType", data.imageType);
  if (file) formData.append("file", file);
  const res = await api.post("/api/admin/resources/certifications", formData);
  return res.data;
};

export const updateCertificationResource = async (
  id: number,
  data: Partial<CertificationResource>,
  file?: File
) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.imageType) formData.append("imageType", data.imageType);
  if (file) formData.append("file", file);
  const res = await api.put(
    `/api/admin/resources/certifications/${id}`,
    formData
  );
  return res.data;
};

export const deleteCertificationResource = async (id: number) => {
  const res = await api.delete(`/api/admin/resources/certifications/${id}`);
  return res.data;
};

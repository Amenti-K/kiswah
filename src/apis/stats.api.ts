import api from "@/lib/api";

export const getCompanyStats = async () => {
  const res = await api.get("/api/admin/company-info");
  const stats = [
    { label: "Total Projects", value: "45" },
    { label: "Active Projects", value: "12" },
    { label: "Staff Members", value: "125" },
    { label: "Departments", value: "3" },
  ];
  return stats;
};

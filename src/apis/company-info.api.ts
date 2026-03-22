import api from "@/lib/axiosInstance";
import {
  AnalyticsData,
  BootstrapData,
} from "@/components/interface/analytics.interface";

export const getBootstrapData = async (): Promise<BootstrapData> => {
  const res = await api.get("/analytics/bootstrap");
  return res.data;
};

export const getAnalytics = async (): Promise<AnalyticsData> => {
  const res = await api.get("/analytics");
  return res.data;
};

import api, { uploadApi } from "@/lib/api";
import { objectToFormData } from "@/lib/formDataHelper";
import { CompanyInfoInterface } from "@/lib/types";

export const editCompanyInfo = async (
  data: CompanyInfoInterface,
  logoFile?: File
) => {
  let res;

  if (logoFile) {
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        objectToFormData(fd, key, value);
      }
    });
    fd.append("logoFile", logoFile);
    res = await uploadApi.put("/api/admin/company-info", fd);
  } else {
    res = await api.put("/api/admin/company-info", data);
  }
  return res.data;
};

import api from "@/lib/api";
import { ContactMessage } from "@/lib/types";

export const sendMessage = async (formData: ContactMessage) => {
  const message = {
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  };
  const response = await api.post("/api/public/contact", message);
};

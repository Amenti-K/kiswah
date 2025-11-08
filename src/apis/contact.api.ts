import emailjs from "@emailjs/browser";
import { ContactMessage } from "@/lib/types";

export const sendMessage = async (formData: ContactMessage) => {
  const { firstName, lastName, email, subject, message } = formData;

  // EmailJS template variables
  const templateParams = {
    name: `${firstName} ${lastName}`,
    from_email: email,
    subject,
    message,
  };

  try {
    const res = await emailjs.send(
      "service_hxep2ir",
      "template_u4gqjv9",
      templateParams,
      "ZAU7Ac84wR33G8EtB"
    );

    // success check
    if (res.status === 200) {
      return { success: true, message: "Email sent successfully!" };
    } else {
      throw new Error("EmailJS returned a non-200 response");
    }
  } catch (err) {
    console.error("EmailJS error:", err);
    throw new Error("Failed to send message. Please try again later.");
  }
};

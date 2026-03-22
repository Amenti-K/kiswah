import { z } from "zod";

export const SocialMediaLinkSchema = z.object({
  id: z.string().optional(),
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Must be a valid URL"),
});

export const CompanySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  about: z.string().min(10, "About description should be at least 10 characters"),
  logoUrl: z.any().optional(),
  mission: z.string().optional(),
  vision: z.string().optional(),
  emails: z.array(z.string().email("Invalid email")).min(1, "At least one email is required"),
  phones: z.array(z.string().min(1, "Phone is required")).min(1, "At least one phone is required"),
  address: z.array(z.string().min(1, "Address is required")).min(1, "At least one address is required"),
  socialLinks: z.array(SocialMediaLinkSchema).optional(),
});

export type CompanyType = z.infer<typeof CompanySchema>;
export type SocialMediaLinkType = z.infer<typeof SocialMediaLinkSchema>;

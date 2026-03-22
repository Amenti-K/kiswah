import { z } from "zod";

export const fileTypes = [
  "companyProfile",
  "Incoterm",
  "HSCode",
  "Other",
] as const;

export const toolsSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().optional(),
  type: z.enum(fileTypes, "Please select a file type"),
  fileUrl: z
    .string()
    .url({ message: "Please enter a valid URL (e.g. Google Drive link)" }),
});

export type ToolsFormType = z.infer<typeof toolsSchema>;

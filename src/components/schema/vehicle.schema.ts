import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  characteristics: z.union([z.string(), z.array(z.string())]).optional(),
  imageUrl: z
    .any()
    .refine((file) => !file || file instanceof File || typeof file === "string", "Invalid image")
    .optional(),
  order: z.string(),
});

export type CategoryType = z.infer<typeof categorySchema>;

export const vehicleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  imageUrls: z.any().optional(), // Can be multiple files or existing URLs
  order: z.string(),
});

export type VehicleType = z.infer<typeof vehicleSchema>;

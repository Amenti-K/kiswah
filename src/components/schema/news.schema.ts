import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const newsSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  published: z.boolean().default(false).optional(),
  images: z
    .array(
      z.custom<File>((v) => v instanceof File, "Please upload a file")
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported",
        )
    )
    .optional(),
});

export type NewsType = z.infer<typeof newsSchema>;

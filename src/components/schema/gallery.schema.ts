import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const gallerySchema = z.object({
  images: z
    .array(
      z.custom<File>((v) => v instanceof File, "Please upload a file")
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported",
        )
    )
    .min(1, "Please upload at least one image"),
});

export type GalleryFormType = z.infer<typeof gallerySchema>;

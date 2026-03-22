import { z } from "zod";

export const serviceSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  iconName: z.string().min(1, { message: "Icon name is required" }),
  order: z.string().min(1, { message: "Order must be at least 1" }),
});

export const processSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  order: z.string().min(1, { message: "Order must be at least 1" }),
});

export type ServiceType = z.infer<typeof serviceSchema>;
export type ProcessType = z.infer<typeof processSchema>;

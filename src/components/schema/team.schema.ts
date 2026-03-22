import { z } from "zod";

export const StaffSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  imageUrl: z.any().optional(),
  order: z.coerce.number().int().default(0),
});

export const TeamSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Team name is required"),
  order: z.coerce.number().int().default(0),
  staffs: z.array(StaffSchema).default([]),
});

export type TeamType = z.infer<typeof TeamSchema>;
export type StaffType = z.infer<typeof StaffSchema>;

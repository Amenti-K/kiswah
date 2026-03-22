import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { FolderOpen, Users, Settings, Plus } from "lucide-react";
import * as LucideIcons from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const iconForLabel = (label: string) => {
  if (label.toLowerCase().includes("project")) return FolderOpen;
  if (label.toLowerCase().includes("member")) return Users;
  if (label.toLowerCase().includes("department")) return Settings;
  return FolderOpen;
};

export const getIcon = (iconName: string) => {
  if (!iconName || typeof iconName !== "string") return LucideIcons.HelpCircle;
  const Icon = (LucideIcons[iconName as keyof typeof LucideIcons] ||
    LucideIcons.Briefcase) as any;

  // Ensure it's a valid icon component (starts with uppercase)
  if (/^[A-Z]/.test(iconName)) {
    return Icon;
  }
  return LucideIcons.HelpCircle;
};

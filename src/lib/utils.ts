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
  const Icon = (LucideIcons as any)[iconName];
  return Icon || LucideIcons.Package;
};

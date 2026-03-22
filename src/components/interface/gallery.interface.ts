export type FileType = "companyProfile" | "Incoterm" | "HSCode" | "Other";

export interface ITool {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  type: FileType;
  createdAt: string;
  updatedAt: string;
}

export interface IGallery {
  id: string;
  imageUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

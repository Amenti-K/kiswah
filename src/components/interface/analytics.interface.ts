export interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  companyName: string;
  about: string;
  logoUrl: string;
  mission: string | null;
  vision: string | null;
  emails: string[];
  phones: string[];
  address: string[];
  socialLinks?: SocialMediaLink[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export enum ToolFileType {
  companyProfile = "companyProfile",
  Incoterm = "Incoterm",
  HSCode = "HSCode",
  Other = "Other",
}

export interface ToolFile {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  type: ToolFileType;
  createdAt: string;
  updatedAt: string;
}

export interface BootstrapData {
  company: Company;
  services: Service[];
  tools: ToolFile[];
}

export interface AnalyticsData {
  services: number;
  staff: number;
  news: number;
  gallery: number;
}

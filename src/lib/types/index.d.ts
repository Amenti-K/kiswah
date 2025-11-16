export interface CompanyInfoInterface {
  id?: number;
  logoId?: number;

  name: string;
  tagline: string;
  description: string;

  founded: string;
  vision: string;
  mission: string;
  values: string;

  employeeCount: number;
  contactEmail: string;
  contactPhone: string;
  address: string;

  socialLinks: Record<string, string>;
  logo?: string;
}

export interface CompanyInfoInput extends CompanyInfoInterface {
  logoFile?: File | null;
}

interface RegisterAdmin {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: "SUPER" | "NORMAL";
  code: string;
}

interface ContactMessage {
  firstName: string;
  lastName?: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

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

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  completedDate?: string;
  location: string;
  client: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
}

// Based on your Prisma schema
interface DepartmentAdmin {
  id: number;
  name: string;
  description?: string;
  Responsibilities?: { text: string }[];
}

export interface ResourceSectionProps {
  title: string;
  icon: React.ReactNode;
  items: any[];
  renderItem: (item: any) => string;
}

// Based on your Prisma schema
export interface Staff {
  id: number;
  name: string;
  title: string;
  bio?: string;
  departmentId?: number;
  department?: { name: string } | null;
  // email?: string;
  // phone?: string;
  // Add other fields as needed
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

interface Staff {
  id: number;
  name: string;
  title: string;
  bio?: string;
  departmentId?: number;
  department?: { name: string } | null;
}

// Types
export type PartnerType =
  | "PARTNERSHIP"
  | "WORKING_RELATIONSHIP"
  | "VENTURE"
  | "COLLABORATION"
  | "SPONSORSHIP";

export interface Partner {
  id?: number;
  name: string;
  type: PartnerType;
  description?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  logo?: { url: string } | null;
}
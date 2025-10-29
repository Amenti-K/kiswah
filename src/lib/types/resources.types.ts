export type ImageType = "LOGO" | "GALLERY" | "CERTIFICATE";

export interface PersonnelResource {
  id?: number;
  category: string;
  count: number;
  description: string;
}

export interface FacilityResource {
  id?: number;
  name: string;
  size: string;
  description: string;
  capabilities?: string[];
  imageType?: ImageType;
}

export interface EquipmentResource {
  id?: number;
  name: string;
  imageType?: ImageType;
}

export interface CertificationResource {
  id?: number;
  name: string;
  imageType?: ImageType;
}

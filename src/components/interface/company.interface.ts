export interface ISocialMediaLink {
  id?: string;
  platform: string;
  url: string;
}

export interface IStaff {
  id: string;
  name: string;
  position: string;
  imageUrl?: string;
  order: number;
}

export interface ITeam {
  id: string;
  name: string;
  order: number;
  staffs: IStaff[];
}

export interface ICompany {
  id: string;
  companyName: string;
  about: string;
  logoUrl: string;
  mission?: string;
  vision?: string;
  emails: string[];
  phones: string[];
  address: string[];
  socialLinks?: ISocialMediaLink[];
  updatedAt?: string;
}

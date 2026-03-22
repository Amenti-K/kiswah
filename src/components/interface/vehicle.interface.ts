export interface IVehicleCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  characteristics: string[];
  imageUrl: string;
  order: number;
  vehicles?: IVehicle[];
  _count?: {
    vehicles: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IVehicle {
  id: string;
  name: string;
  description: string;
  imageUrls: string[];
  order: number;
  categoryId: string;
  category?: IVehicleCategory;
  createdAt: string;
  updatedAt: string;
}

export interface IAdmin {
  id: string;
  name: string;
  phoneNumber: string;
  isSuper: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterAdmin extends Pick<IAdmin, "name" | "phoneNumber" | "isSuper"> {
  password?: string;
}

export interface IUpdateAdmin extends Partial<IRegisterAdmin> {
  id: string;
}

export interface IService {
  id: string;
  title: string;
  description: string;
  order: number;
  iconName: string;
}

export interface IServiceCreate {
  title: string;
  description: string;
  order: number | string;
  iconName: string;
}

export interface IServiceUpdate {
  id: string;
  title: string;
  description: string;
  order: number | string;
  iconName: string;
}

export interface IProcess {
  id?: string;
  title: string;
  description: string;
  order: number | string;
}

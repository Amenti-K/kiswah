export interface INews {
  id: string;
  imageUrls: string[];
  title: string;
  description: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

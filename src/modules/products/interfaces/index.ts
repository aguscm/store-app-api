import type { ProductCategory } from '../helpers';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  imageUrl: string;
  brand: string;
  rating?: number;
  createdAt: Date;
}

export interface IProductFilter {
  category?: ProductCategory;
  brand?: string;
}

export interface IPaginator<T> {
  items: T[];
  limit: number;
  offset: number;
  total: number;
}

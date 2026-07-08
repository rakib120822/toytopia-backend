import { ProductCategory } from "../../../generated/prisma/enums";
import { ProductWhereInput } from "../../../generated/prisma/models";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  brand: string;
  images: string[];
}

export interface IQuery extends ProductWhereInput {
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
  searchTerm?: string;
}

import { ProductCategory } from "../../../generated/prisma/enums";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  brand: string;
  images: string[];
}

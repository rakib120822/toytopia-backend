import {
  ProductCategory,
  ProductStatus,
} from "../../../generated/prisma/enums";
import { ProductWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IProduct, IQuery } from "./product.interface";

const createProductIntoDB = async (payload: IProduct) => {
  const { title, description, price, stock, category, images, brand } = payload;
  const product = await prisma.product.create({
    data: {
      title,
      description,
      price,
      stock,
      category,
      images,
      brand,
    },
  });
  return product;
};
const getProductFromDB = async (query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const AndConditions: ProductWhereInput[] = [];
  if (query.searchTerm) {
    AndConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
          description: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }
  if (query.title) {
    AndConditions.push({ title: query.title });
  }
  if (query.category) {
    AndConditions.push({ category: query.category as ProductCategory});
  }
  if (query.brand) {
    AndConditions.push({ brand: query.brand });
  }
  if (query.price) {
    AndConditions.push({
      price: { lte: Number(query.price) },
    });
  }

  const product = await prisma.product.findMany({
    where: {
      AND: AndConditions,
    },
    take: limit,
    skip: skip,
    orderBy: { [sortBy]: sortOrder },
  });
  const totalProduct = await prisma.product.count({
    where: { AND: AndConditions },
  });

  const categories = Object.values(ProductCategory);

  return {
    meta: {
      limit,
      totalPages: Math.ceil(totalProduct / limit),
      page,
      total: totalProduct,
    },
    data: { categories, product },
  };
};
const getProductByIdFromDB = async () => {};
const updateProductIntoDB = async () => {};
const deleteProductIntoDB = async () => {};

const productService = {
  createProductIntoDB,
  getProductFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};

export default productService;

import { prisma } from "../../lib/prisma";
import { IProduct } from "./product.interface";

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
const getProductFromDB = async () => {};
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

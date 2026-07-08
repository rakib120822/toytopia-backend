import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import productService from "./product.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await productService.createProductIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Product created successfully",
      data: result,
    });
  },
);

const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getProductById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const productController = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productController;

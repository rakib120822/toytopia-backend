import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import cartService from "./cart.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const addToCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const productId = req.params.productId as string;
    const result = await cartService.addToCart({ userId, productId });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Add to cart successfully",
      data: result,
    });
  },
);
const getAllCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    const result = await cartService.getAllCart(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cart retrieved successfully",
      data: result,
    });
  },
);

const updateCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const result = await cartService.updateCart(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Increment  successfully",
      data: result,
    });
  },
);

const removeFromCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const result = await cartService.removeFromCart(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Delete  successfully",
      data: result,
    });
  },
);

const cartController = {
  addToCart,
  getAllCart,
  removeFromCart,
  updateCart,
};

export default cartController;

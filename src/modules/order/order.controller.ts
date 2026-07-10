import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import orderService from "./order.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const result = await orderService.createOrderIntoDB(id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Order created successfully",
      data: result,
    });
    // console.log(result);
  },
);

const getOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await orderService.getOrder(
      "1caf8b33-3030-47e3-9437-f5412118c0d7",
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Order retrieved successfully",
      data: result,
    });
  },
);

const getOrderById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
  },
);
const updateOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const orderController = {
  createOrder,
  getOrder,
  getOrderById,
  updateOrder,
};

export default orderController;

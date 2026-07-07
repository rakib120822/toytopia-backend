import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import userService from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await userService.userCreateIntoDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created Successfully",
      data: result,
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const userController = {
  createUser,
  getMyProfile,
  updateProfile,
};

export default userController;

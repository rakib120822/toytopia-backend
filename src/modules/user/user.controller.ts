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
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getMyProfileFromDB(req.body?.email);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved Successfully",
      data: result,
    });
  },
);

const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, bio, address, phone, name, profilePhoto } = req.body;
    const result = await userService.updateProfileIntoDB(userId, {
      bio,
      address,
      phone,
      name,
      profilePhoto,
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated Successfully",
      data: result,
    });
  },
);

const userController = {
  createUser,
  getMyProfile,
  updateProfile,
};

export default userController;

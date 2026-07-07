import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import authService from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(
      email,
      password,
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User loggedIn Successfully",
      data: { accessToken, refreshToken },
    });
  },
);

const generateAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const authController = { loginUser, generateAccessToken };
export default authController;

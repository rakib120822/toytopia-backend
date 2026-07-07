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

const logOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Logged out successfully",
      data: {},
    });
  },
);

const generateAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const { accessToken } = await authService.RefreshToken(refreshToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Access token created successfully",
      data: { accessToken },
    });
  },
);

const authController = { loginUser, generateAccessToken, logOut };
export default authController;

import { NextFunction, Request, Response } from "express";
import { ActiveStatus, Role } from "../../generated/prisma/enums";
import catchAsync from "../utils/catchAsync";
import jwtUtils from "../utils/jwtUtils";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const auth = async (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error("Your not logged in");
    }

    const verifiedToken = await jwtUtils.verifyRefreshToken(
      token,
      config.access_token_secret,
    );
    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }
    const { id, name, email, role } = verifiedToken.data as JwtPayload;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error(
        "Forbidden. You don't have permission to access this resource",
      );
    }

    const user = await prisma.user.findUnique({
      where: { id, name, email, role },
    });
    if (!user) {
      throw new Error("User not found.Please log in again");
    }
    if (user.activeStatus === ActiveStatus.BLOCKED) {
      throw new Error("Your account has been blocked. Please contact support.");
    }

    req.user = {
      id,
      email,
      name,
      role,
    };
    next();
  });
};


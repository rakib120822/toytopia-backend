import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import jwtUtils from "../../utils/jwtUtils";

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Password is incorrect");
  }
  if (user.activeStatus === "BLOCKED") {
    throw new Error("Your account has been blocked. Please contact support");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = await jwtUtils.createToken(
    jwtPayload,
    config.access_token_secret,
    config.access_token_expiresIn,
  );

  const refreshToken = await jwtUtils.createToken(
    jwtPayload,
    config.refresh_token_secret,
    config.refresh_token_expiresIn,
  );

//   console.log({ accessToken, refreshToken });

  return {
    refreshToken,
    accessToken,
  };
};

const authService = {
  loginUser,
};

export default authService;

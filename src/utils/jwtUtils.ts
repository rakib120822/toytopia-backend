import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
const createToken = async (
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

const verifyRefreshToken = async (refreshToken: string, secret: string) => {
  try {
    const result = jwt.verify(refreshToken, secret);
    return { success: true, data: result };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

const jwtUtils = {
  createToken,
  verifyRefreshToken,
};

export default jwtUtils;

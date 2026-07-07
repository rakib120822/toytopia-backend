import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
const createToken = async (
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

const jwtUtils = {
  createToken,
};

export default jwtUtils;

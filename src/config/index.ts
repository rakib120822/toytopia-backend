import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  app_url: process.env.APP_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET!,
  access_token_expiresIn: process.env.ACCESS_EXPIRES_IN!,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET!,
  refresh_token_expiresIn: process.env.REFRESH_EXPIRES_IN!,
  ssl_commerz_store_id: process.env.SSL_COMMERZ_STORE_ID!,
  ssl_commerz_store_pass: process.env.SSL_COMMERZ_STORE_PASSWORD!,
};

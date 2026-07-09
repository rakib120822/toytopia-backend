import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import productRoutes from "./modules/product/product.route";
import reviewRoutes from "./modules/review/review.routes";
const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello toytopia");
});

export default app;

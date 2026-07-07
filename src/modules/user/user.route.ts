import { Router } from "express";
import userController from "./user.controller";

const router: Router = Router();
router.post("/register", userController.createUser);
const userRoutes = router;
export default userRoutes;

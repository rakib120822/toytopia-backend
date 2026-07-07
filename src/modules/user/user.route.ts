import { Router } from "express";
import userController from "./user.controller";

const router: Router = Router();
router.post("/register", userController.createUser);
router.get("/my-profile", userController.getMyProfile);
router.patch("/update", userController.updateProfile);
const userRoutes = router;
export default userRoutes;

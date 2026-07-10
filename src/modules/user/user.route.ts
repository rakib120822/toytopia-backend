import { Router } from "express";
import userController from "./user.controller";
import { Role } from "../../../generated/prisma/enums";
// extend express Request to include user
interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
const router: Router = Router();
router.post("/register", userController.createUser);
router.get("/my-profile", userController.getMyProfile);
router.patch("/update", userController.updateProfile);
const userRoutes = router;
export default userRoutes;

import { Router } from "express";
import cartController from "./cart.controller";

const router: Router = Router();

router.post("/:productId", cartController.addToCart);
router.get("/", cartController.getAllCart);
router.patch("/:id", cartController.updateCart);
router.delete("/:id", cartController.removeFromCart);

const cartRoutes = router;
export default cartRoutes;

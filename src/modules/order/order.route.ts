import { Router } from "express";
import orderController from "./order.controller";

const router: Router = Router();
router.post("/:id", orderController.createOrder);
router.get("/", orderController.getOrder);
router.get("/:id", orderController.getOrderById);
router.patch("/:id", orderController.updateOrder);
const orderRoutes = router;
export default orderRoutes;

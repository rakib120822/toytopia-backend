import { Router } from "express";
import productController from "./product.controller";

const router: Router = Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

const productRoutes = router;
export default productRoutes;

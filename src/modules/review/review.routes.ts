import { Router } from "express";
import reviewController from "./review.controller";

const router: Router = Router();

router.post("/products/:id", reviewController.createReview);
router.get("/products/:id", reviewController.getReview);
router.patch("/:reviewId", reviewController.updateReview);
router.delete("/:reviewId", reviewController.deleteReview);

const reviewRoutes = router;

export default reviewRoutes;

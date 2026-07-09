import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import reviewService from "./review.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id as string;
    const { userId, rating, comment } = req.body;
    const result = await reviewService.createReview({
      productId,
      userId,
      rating,
      comment,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Review created successfully",
      data: result,
    });
  },
);
const getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId as string;
    const result = await reviewService.updateReview(reviewId, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Review updated successfully",
      data: result,
    });
  },
);
const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId as string;
    const result = await reviewService.deleteReview(reviewId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Review deleted successfully",
      data: result,
    });
  },
);

const reviewController = {
  createReview,
  getReview,
  updateReview,
  deleteReview,
};

export default reviewController;

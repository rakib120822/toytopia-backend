import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";

const createReview = async (payload: IReview) => {
  await prisma.product.findUniqueOrThrow({ where: { id: payload.productId } });
  const review = await prisma.review.create({
    data: payload,
  });
  return review;
};

const updateReview = async (id: string, payload: any) => {
  await prisma.review.findUniqueOrThrow({ where: { id } });
  const updatedReview = await prisma.review.update({
    where: { id },
    data: payload,
  });
  return updatedReview;
};
const deleteReview = async (id: string) => {
  await prisma.review.findUniqueOrThrow({ where: { id } });
  await prisma.review.delete({ where: { id } });
  return null;
};

const reviewService = {
  createReview,
  updateReview,
  deleteReview,
};

export default reviewService;

import { prisma } from "../../lib/prisma";

const addToCart = async (payload: { userId: string; productId: string }) => {
  await prisma.product.findUniqueOrThrow({ where: { id: payload.productId } });
  const result = await prisma.cart.create({
    data: payload,
  });
  return result;
};
const getAllCart = async (userId: string) => {
  await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const result = await prisma.cart.findMany({
    where: { userId },
    include: {
      product: {
        select: { images: true, price: true, brand: true, title: true },
      },
    },
  });
  //   console.log(result);

  return result;
};

const updateCart = async (cartId: string) => {
  await prisma.cart.findUniqueOrThrow({ where: { id: cartId } });
  const result = await prisma.cart.update({
    where: { id: cartId },
    data: { quantity: { increment: 1 } },
    include: {
      product: {
        select: { images: true, price: true, brand: true, title: true },
      },
    },
  });
  return result;
};

const removeFromCart = async (id: string) => {
  await prisma.cart.findUniqueOrThrow({ where: { id } });
  await prisma.cart.delete({ where: { id } });
  return null;
};

const cartService = {
  addToCart,
  getAllCart,
  removeFromCart,
  updateCart,
};

export default cartService;

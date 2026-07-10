import { prisma } from "../../lib/prisma";

const createOrderIntoDB = async (id: string, payload?: any) => {
  let totalAmount = 0;
  payload.products.forEach((product: any) => {
    totalAmount += product.quantity * product.product.price;
  });

  const order = await prisma.orders.create({
    data: {
      customerId: id,
      totalAmount,
      status: "PENDING",
      address: payload.address,
      phone: payload.phone,
    },
  });
  const dataValue: any = [];
  payload.products.forEach((product: any) => {
    const item = {
      orderId: order.id,
      productId: product.productId,
      quantity: product.quantity,
    };
    dataValue.push(item);
  });
  await prisma.orderItem.createManyAndReturn({
    data: dataValue,
  });
  const fullOrder = await prisma.orders.findUniqueOrThrow({
    where: { id: order.id },
    include: {
      orderItems: true,
    },
  });

  await prisma.cart.deleteMany({ where: { userId: id } });

  return fullOrder;
};

const getOrder = async (id: string) => {
  const data = await prisma.orders.findMany({
    where: { customerId: id },
    include: { orderItems: { include: { product: true } } },
  });
  if (!data) {
    throw new Error("No order is available");
  }
  return data;
};

const orderService = { createOrderIntoDB, getOrder };
export default orderService;

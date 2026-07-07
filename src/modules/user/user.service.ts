import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { IUser } from "./user.interface";

const userCreateIntoDB = async (payload: IUser) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExists = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExists) {
    throw new Error("User Already Exists!");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round),
  );

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashPassword,
      profile: {
        create: {
          image: profilePhoto,
        },
      },
    },
  });

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
    include: {
      profile: true,
    },
    omit: {
      password: true,
    },
  });
  return user;
};

const getMyProfileFromDB = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
    include: {
      profile: true,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const updateProfileIntoDB = async (userId: string, payload: any) => {
  const { name, profilePhoto, bio, phone, address } = payload;
  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      profile: {
        update: {
          image: profilePhoto,
          bio,
          phone,
          address,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
    omit: { password: true },
  });

  return user;
};

const userService = {
  userCreateIntoDB,
  getMyProfileFromDB,
  updateProfileIntoDB,
};

export default userService;

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('STEM', 'PUZZLES', 'PLUSHES', 'DOLLS', 'ACTION', 'FIGURES', 'BOARD_GAMES', 'OUTDOOR');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'OUT_OF_STOCK', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "images" TEXT[],
    "category" "ProductCategory" NOT NULL,
    "stock" INTEGER NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "ratings" INTEGER NOT NULL,
    "status" "ProductStatus" NOT NULL,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - Added the required column `img` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published_date` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "published_date" TIMESTAMP(3) NOT NULL;

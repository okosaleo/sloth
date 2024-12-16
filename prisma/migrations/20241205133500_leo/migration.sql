/*
  Warnings:

  - You are about to drop the column `referrerId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_referrerId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "referrerId",
ADD COLUMN     "referredBy" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredBy_fkey" FOREIGN KEY ("referredBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

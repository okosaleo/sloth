/*
  Warnings:

  - You are about to drop the column `referrerusername` on the `Referral` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "referrerusername",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "referrerUsername" TEXT;

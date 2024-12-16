/*
  Warnings:

  - The primary key for the `Referral` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `refereeId` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referrerId` on the `Referral` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referrals]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `Referral` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_refereeId_fkey";

-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_referrerId_fkey";

-- DropIndex
DROP INDEX "Referral_refereeId_key";

-- AlterTable
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "refereeId",
DROP COLUMN "referrerId",
ADD COLUMN     "referrals" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Referral_id_key" ON "Referral"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referrals_key" ON "Referral"("referrals");

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

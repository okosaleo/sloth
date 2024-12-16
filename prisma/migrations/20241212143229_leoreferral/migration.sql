/*
  Warnings:

  - You are about to drop the column `referrals` on the `Referral` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,referrerId]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referrerId` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_id_fkey";

-- DropIndex
DROP INDEX "Referral_id_key";

-- DropIndex
DROP INDEX "Referral_referrals_key";

-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "referrals",
ADD COLUMN     "referrerId" BIGINT NOT NULL,
ADD COLUMN     "userId" BIGINT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Referral_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_userId_referrerId_key" ON "Referral"("userId", "referrerId");

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

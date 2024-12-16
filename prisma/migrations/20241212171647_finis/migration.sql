/*
  Warnings:

  - You are about to drop the column `username` on the `Referral` table. All the data in the column will be lost.
  - Changed the type of `referrerId` on the `Referral` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_id_fkey";

-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "username",
ADD COLUMN     "referrerusername" TEXT,
DROP COLUMN "referrerId",
ADD COLUMN     "referrerId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Referral_userId_referrerId_key" ON "Referral"("userId", "referrerId");

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

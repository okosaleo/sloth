-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_referrerId_fkey";

-- AlterTable
ALTER TABLE "Referral" ALTER COLUMN "referrerId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

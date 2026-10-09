/*
  Warnings:

  - You are about to drop the column `payPeriodId` on the `PayPeriodContent` table. All the data in the column will be lost.
  - Added the required column `payPeriodPriceId` to the `PayPeriodContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PayPeriodContent" DROP CONSTRAINT "PayPeriodContent_payPeriodId_fkey";

-- AlterTable
ALTER TABLE "PayPeriodContent" DROP COLUMN "payPeriodId",
ADD COLUMN     "payPeriodPriceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PayPeriodContent" ADD CONSTRAINT "PayPeriodContent_payPeriodPriceId_fkey" FOREIGN KEY ("payPeriodPriceId") REFERENCES "PayPeriodPrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

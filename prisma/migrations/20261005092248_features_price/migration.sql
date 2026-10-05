/*
  Warnings:

  - You are about to drop the column `payPeriodId` on the `Features` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Features` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Features" DROP CONSTRAINT "Features_payPeriodId_fkey";

-- AlterTable
ALTER TABLE "Features" DROP COLUMN "payPeriodId",
DROP COLUMN "price";

-- CreateTable
CREATE TABLE "FeaturesPrice" (
    "id" SERIAL NOT NULL,
    "featureId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "payPeriodId" INTEGER,
    "status" BOOLEAN DEFAULT true,

    CONSTRAINT "FeaturesPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeaturesPrice" ADD CONSTRAINT "FeaturesPrice_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesPrice" ADD CONSTRAINT "FeaturesPrice_payPeriodId_fkey" FOREIGN KEY ("payPeriodId") REFERENCES "PayPeriod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

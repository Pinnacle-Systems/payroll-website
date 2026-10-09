/*
  Warnings:

  - You are about to drop the `FeaturesPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeaturesPrice" DROP CONSTRAINT "FeaturesPrice_featureId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesPrice" DROP CONSTRAINT "FeaturesPrice_payPeriodId_fkey";

-- DropTable
DROP TABLE "FeaturesPrice";

-- CreateTable
CREATE TABLE "PayPeriodPrice" (
    "id" SERIAL NOT NULL,
    "payPeriodId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN DEFAULT true,

    CONSTRAINT "PayPeriodPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PayPeriodPrice" ADD CONSTRAINT "PayPeriodPrice_payPeriodId_fkey" FOREIGN KEY ("payPeriodId") REFERENCES "PayPeriod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayPeriodPrice" ADD CONSTRAINT "PayPeriodPrice_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Features"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

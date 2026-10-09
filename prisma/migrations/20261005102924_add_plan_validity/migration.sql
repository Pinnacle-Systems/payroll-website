-- AlterTable
ALTER TABLE "PayPeriod" ADD COLUMN     "validityDays" INTEGER NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Features" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "PayPeriodContent" (
    "id" SERIAL NOT NULL,
    "payPeriodId" INTEGER NOT NULL,
    "name" TEXT,

    CONSTRAINT "PayPeriodContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PayPeriodContent" ADD CONSTRAINT "PayPeriodContent_payPeriodId_fkey" FOREIGN KEY ("payPeriodId") REFERENCES "PayPeriod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

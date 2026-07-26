-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "paid" BOOLEAN DEFAULT false,
ADD COLUMN     "paidDate" TIMESTAMP(3);

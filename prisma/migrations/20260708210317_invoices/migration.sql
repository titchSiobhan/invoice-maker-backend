/*
  Warnings:

  - The `invoiceNumber` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "invoiceNumber",
ADD COLUMN     "invoiceNumber" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

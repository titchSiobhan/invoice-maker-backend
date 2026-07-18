-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "invoiceNumber" DROP DEFAULT,
ALTER COLUMN "invoiceNumber" SET DATA TYPE TEXT;

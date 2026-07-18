/*
  Warnings:

  - The `street` column on the `Jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `town` column on the `Jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "street",
ADD COLUMN     "street" TEXT[],
DROP COLUMN "town",
ADD COLUMN     "town" TEXT[];

/*
  Warnings:

  - You are about to drop the column `address` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `jobStart` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `town` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "address",
DROP COLUMN "endDate",
DROP COLUMN "jobStart",
DROP COLUMN "status",
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "town" TEXT NOT NULL;

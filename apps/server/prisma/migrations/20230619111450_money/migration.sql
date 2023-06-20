/*
  Warnings:

  - Made the column `location` on table `Employer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employer" ALTER COLUMN "location" SET NOT NULL;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "money" TEXT;

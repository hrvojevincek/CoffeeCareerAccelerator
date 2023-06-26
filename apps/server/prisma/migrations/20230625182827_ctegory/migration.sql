/*
  Warnings:

  - Made the column `category` on table `Employer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employer" ALTER COLUMN "category" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "category" SET NOT NULL;

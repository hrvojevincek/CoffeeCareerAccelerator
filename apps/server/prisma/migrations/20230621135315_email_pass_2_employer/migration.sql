/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employer_email_key" ON "Employer"("email");

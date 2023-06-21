/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Employer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Employer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employer_name_key";

-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employer_username_key" ON "Employer"("username");

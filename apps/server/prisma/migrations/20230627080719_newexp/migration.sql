/*
  Warnings:

  - You are about to drop the column `finishDate` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `jobrole` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `dates` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "finishDate",
DROP COLUMN "jobrole",
DROP COLUMN "startDate",
ADD COLUMN     "dates" INTEGER NOT NULL;

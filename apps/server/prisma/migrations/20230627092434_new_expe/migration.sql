/*
  Warnings:

  - The primary key for the `Experience` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Experience_pkey" PRIMARY KEY ("id");

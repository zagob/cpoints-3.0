/*
  Warnings:

  - Added the required column `datetime` to the `Points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Points" ADD COLUMN     "datetime" TIMESTAMP(3) NOT NULL;

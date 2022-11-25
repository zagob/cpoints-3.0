/*
  Warnings:

  - You are about to drop the column `totalMinutesPoint` on the `BankPointsBalance` table. All the data in the column will be lost.
  - Added the required column `lunch` to the `BankPointsBalance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeAfternoon` to the `BankPointsBalance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeMorning` to the `BankPointsBalance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTimePoint` to the `BankPointsBalance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankPointsBalance" DROP COLUMN "totalMinutesPoint",
ADD COLUMN     "lunch" TEXT NOT NULL,
ADD COLUMN     "timeAfternoon" TEXT NOT NULL,
ADD COLUMN     "timeMorning" TEXT NOT NULL,
ADD COLUMN     "totalTimePoint" TEXT NOT NULL;

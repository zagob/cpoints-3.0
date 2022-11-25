-- CreateEnum
CREATE TYPE "PointStatus" AS ENUM ('UP', 'EQUAL', 'DOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "infoUserId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoUser" (
    "id" TEXT NOT NULL,
    "totalHour" TEXT NOT NULL,
    "startHour" TEXT NOT NULL,
    "entryLunchHour" TEXT NOT NULL,
    "exitLunchHour" TEXT NOT NULL,
    "exitHour" TEXT NOT NULL,

    CONSTRAINT "InfoUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Points" (
    "id" TEXT NOT NULL,
    "entryOne" TEXT,
    "exitOne" TEXT,
    "entryTwo" TEXT,
    "exitTwo" TEXT,
    "isHoliday" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankPointsBalance" (
    "id" TEXT NOT NULL,
    "totalMinutesPoint" INTEGER NOT NULL,
    "statusPoint" "PointStatus" NOT NULL,
    "pointId" TEXT NOT NULL,

    CONSTRAINT "BankPointsBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_infoUserId_key" ON "User"("infoUserId");

-- CreateIndex
CREATE UNIQUE INDEX "BankPointsBalance_pointId_key" ON "BankPointsBalance"("pointId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_infoUserId_fkey" FOREIGN KEY ("infoUserId") REFERENCES "InfoUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Points" ADD CONSTRAINT "Points_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankPointsBalance" ADD CONSTRAINT "BankPointsBalance_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

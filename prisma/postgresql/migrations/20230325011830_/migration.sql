/*
  Warnings:

  - You are about to drop the column `hp_max` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `lvl` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `mp_max` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `xp_current` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `xp_need` on the `Hero` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hero" DROP COLUMN "hp_max",
DROP COLUMN "lvl",
DROP COLUMN "mp_max",
DROP COLUMN "xp_current",
DROP COLUMN "xp_need";

-- CreateTable
CREATE TABLE "RegistrationCheck" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "code" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "RegistrationCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationCheck_email_key" ON "RegistrationCheck"("email");

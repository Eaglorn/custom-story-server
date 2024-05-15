/*
  Warnings:

  - You are about to drop the column `agi` on the `hero` table. All the data in the column will be lost.
  - You are about to drop the column `hp` on the `hero` table. All the data in the column will be lost.
  - You are about to drop the column `mp` on the `hero` table. All the data in the column will be lost.
  - You are about to drop the column `sta` on the `hero` table. All the data in the column will be lost.
  - You are about to drop the column `str` on the `hero` table. All the data in the column will be lost.
  - You are about to drop the column `vit` on the `hero` table. All the data in the column will be lost.
  - You are about to drop the column `wis` on the `hero` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hero" DROP COLUMN "agi",
DROP COLUMN "hp",
DROP COLUMN "mp",
DROP COLUMN "sta",
DROP COLUMN "str",
DROP COLUMN "vit",
DROP COLUMN "wis",
ADD COLUMN     "body" DECIMAL(7,3) NOT NULL DEFAULT 10.0;

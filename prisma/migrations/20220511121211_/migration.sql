/*
  Warnings:

  - You are about to drop the column `agi` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `int` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `str` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `vit` on the `Hero` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hero" DROP COLUMN "agi",
DROP COLUMN "int",
DROP COLUMN "str",
DROP COLUMN "vit";

-- CreateTable
CREATE TABLE "HeroStats" (
    "id" SERIAL NOT NULL,
    "hero_id" INTEGER,
    "str" DECIMAL(4,3) NOT NULL DEFAULT 10,
    "agi" DECIMAL(4,3) NOT NULL DEFAULT 10,
    "vit" DECIMAL(4,3) NOT NULL DEFAULT 10,
    "int" DECIMAL(4,3) NOT NULL DEFAULT 10,

    CONSTRAINT "HeroStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HeroStats_hero_id_key" ON "HeroStats"("hero_id");

-- AddForeignKey
ALTER TABLE "HeroStats" ADD CONSTRAINT "HeroStats_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Hero"("id") ON DELETE SET NULL ON UPDATE CASCADE;

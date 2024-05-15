/*
  Warnings:

  - You are about to alter the column `lvl` on the `Hero` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,3)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Hero" ALTER COLUMN "lvl" SET DEFAULT 0,
ALTER COLUMN "lvl" SET DATA TYPE INTEGER,
ALTER COLUMN "agi" SET DATA TYPE DECIMAL(7,3),
ALTER COLUMN "hp" SET DATA TYPE DECIMAL(9,3),
ALTER COLUMN "hp_max" SET DATA TYPE DECIMAL(9,3),
ALTER COLUMN "int" SET DATA TYPE DECIMAL(7,3),
ALTER COLUMN "mp" SET DATA TYPE DECIMAL(9,3),
ALTER COLUMN "mp_max" SET DATA TYPE DECIMAL(9,3),
ALTER COLUMN "sta" SET DATA TYPE DECIMAL(7,3),
ALTER COLUMN "str" SET DATA TYPE DECIMAL(7,3),
ALTER COLUMN "vit" SET DATA TYPE DECIMAL(7,3),
ALTER COLUMN "wis" SET DATA TYPE DECIMAL(7,3);

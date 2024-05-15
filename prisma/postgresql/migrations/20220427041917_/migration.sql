/*
  Warnings:

  - The `real_coin` column on the `UserBalance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `game_coin` column on the `UserBalance` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserBalance" DROP COLUMN "real_coin",
ADD COLUMN     "real_coin" MONEY NOT NULL DEFAULT 0.0,
DROP COLUMN "game_coin",
ADD COLUMN     "game_coin" MONEY NOT NULL DEFAULT 0.0;

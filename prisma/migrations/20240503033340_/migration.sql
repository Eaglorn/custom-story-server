/*
  Warnings:

  - You are about to drop the column `status` on the `registration_check` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "registration_check_state" AS ENUM ('write_code', 'history_read', 'hero_create');

-- AlterTable
ALTER TABLE "registration_check" DROP COLUMN "status",
ADD COLUMN     "state" "registration_check_state" NOT NULL DEFAULT 'write_code';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "status";

-- DropEnum
DROP TYPE "registration_check_ststus";

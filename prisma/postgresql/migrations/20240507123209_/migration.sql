/*
  Warnings:

  - You are about to drop the column `state` on the `registration_check` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "registration_check_type" AS ENUM ('write_code', 'history_read', 'hero_create');

-- AlterTable
ALTER TABLE "registration_check" DROP COLUMN "state",
ADD COLUMN     "type" "registration_check_type" NOT NULL DEFAULT 'write_code';

-- DropEnum
DROP TYPE "registration_check_state";

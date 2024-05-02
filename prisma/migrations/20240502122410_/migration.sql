-- CreateEnum
CREATE TYPE "registration_check_ststus" AS ENUM ('write_code', 'hero_create');

-- AlterTable
ALTER TABLE "registration_check" ADD COLUMN     "status" "registration_check_ststus" NOT NULL DEFAULT 'write_code';

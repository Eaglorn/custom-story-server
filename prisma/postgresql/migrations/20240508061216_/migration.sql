/*
  Warnings:

  - The values [write_code] on the enum `registration_check_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "registration_check_type_new" AS ENUM ('code_write', 'history_read', 'hero_create');
ALTER TABLE "registration_check" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "registration_check" ALTER COLUMN "type" TYPE "registration_check_type_new" USING ("type"::text::"registration_check_type_new");
ALTER TYPE "registration_check_type" RENAME TO "registration_check_type_old";
ALTER TYPE "registration_check_type_new" RENAME TO "registration_check_type";
DROP TYPE "registration_check_type_old";
ALTER TABLE "registration_check" ALTER COLUMN "type" SET DEFAULT 'code_write';
COMMIT;

-- AlterTable
ALTER TABLE "registration_check" ALTER COLUMN "type" SET DEFAULT 'code_write';

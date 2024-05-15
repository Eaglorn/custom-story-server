/*
  Warnings:

  - The `date` column on the `registration_check` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "registration_check" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3);

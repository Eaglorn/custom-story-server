/*
  Warnings:

  - You are about to drop the `ContainerItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EquipmentItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hero` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegistrationCheck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('admin', 'moderator', 'vip', 'user');

-- CreateEnum
CREATE TYPE "equipment_item_slot" AS ENUM ('head', 'shoulders', 'body', 'bracers', 'gloves', 'belt', 'legs', 'boots', 'left_hand', 'right_hand', 'both_hand');

-- DropForeignKey
ALTER TABLE "ContainerItem" DROP CONSTRAINT "ContainerItem_hero_id_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentItem" DROP CONSTRAINT "EquipmentItem_hero_id_fkey";

-- DropForeignKey
ALTER TABLE "Hero" DROP CONSTRAINT "Hero_user_id_fkey";

-- DropTable
DROP TABLE "ContainerItem";

-- DropTable
DROP TABLE "EquipmentItem";

-- DropTable
DROP TABLE "Hero";

-- DropTable
DROP TABLE "RegistrationCheck";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "EquipmentItemSlot";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "registration_check" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "code" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "registration_check_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "type" "user_type" NOT NULL DEFAULT 'user',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "money" DECIMAL(15,3) NOT NULL DEFAULT 0.0,
    "hp" DECIMAL(9,3) NOT NULL DEFAULT 0.0,
    "mp" DECIMAL(9,3) NOT NULL DEFAULT 0.0,
    "str" DECIMAL(7,3) NOT NULL DEFAULT 10.0,
    "agi" DECIMAL(7,3) NOT NULL DEFAULT 10.0,
    "vit" DECIMAL(7,3) NOT NULL DEFAULT 10.0,
    "sta" DECIMAL(7,3) NOT NULL DEFAULT 10.0,
    "int" DECIMAL(7,3) NOT NULL DEFAULT 10.0,
    "wis" DECIMAL(7,3) NOT NULL DEFAULT 10.0,
    "container_slots" SMALLINT DEFAULT 10,

    CONSTRAINT "hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment_item" (
    "id" BIGSERIAL NOT NULL,
    "hero_id" INTEGER NOT NULL,
    "slot" "equipment_item_slot" NOT NULL,

    CONSTRAINT "equipment_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "container_item" (
    "id" BIGSERIAL NOT NULL,
    "hero_id" INTEGER NOT NULL,

    CONSTRAINT "container_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registration_check_email_key" ON "registration_check"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hero_user_id_key" ON "hero"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_item_hero_id_key" ON "equipment_item"("hero_id");

-- CreateIndex
CREATE UNIQUE INDEX "container_item_hero_id_key" ON "container_item"("hero_id");

-- AddForeignKey
ALTER TABLE "hero" ADD CONSTRAINT "hero_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_item" ADD CONSTRAINT "equipment_item_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "container_item" ADD CONSTRAINT "container_item_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

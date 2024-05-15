/*
  Warnings:

  - You are about to drop the `UserBalance` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EquipmentItemSlot" AS ENUM ('head', 'shoulders', 'body', 'bracers', 'gloves', 'belt', 'legs', 'boots', 'left_hand', 'right_hand', 'both_hand');

-- DropForeignKey
ALTER TABLE "UserBalance" DROP CONSTRAINT "UserBalance_user_id_fkey";

-- DropTable
DROP TABLE "UserBalance";

-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "money" DECIMAL(15,3) NOT NULL DEFAULT 0.0,
    "xp_current" DECIMAL(10,3) NOT NULL DEFAULT 0.0,
    "xp_need" DECIMAL(10,3) NOT NULL DEFAULT 0.0,
    "lvl" DECIMAL(4,3) NOT NULL DEFAULT 0,
    "str" DECIMAL(4,3) NOT NULL DEFAULT 10,
    "agi" DECIMAL(4,3) NOT NULL DEFAULT 10,
    "vit" DECIMAL(4,3) NOT NULL DEFAULT 10,
    "int" DECIMAL(4,3) NOT NULL DEFAULT 10,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "hero_id" INTEGER,
    "container_slots" SMALLINT DEFAULT 10,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentItem" (
    "id" BIGSERIAL NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "slot" "EquipmentItemSlot" NOT NULL,

    CONSTRAINT "EquipmentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContainerItem" (
    "id" BIGSERIAL NOT NULL,
    "inventory_id" INTEGER NOT NULL,

    CONSTRAINT "ContainerItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hero_user_id_key" ON "Hero"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_hero_id_key" ON "Inventory"("hero_id");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentItem_inventory_id_key" ON "EquipmentItem"("inventory_id");

-- CreateIndex
CREATE UNIQUE INDEX "ContainerItem_inventory_id_key" ON "ContainerItem"("inventory_id");

-- AddForeignKey
ALTER TABLE "Hero" ADD CONSTRAINT "Hero_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Hero"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentItem" ADD CONSTRAINT "EquipmentItem_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerItem" ADD CONSTRAINT "ContainerItem_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

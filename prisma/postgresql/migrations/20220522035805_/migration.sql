/*
  Warnings:

  - You are about to drop the column `inventory_id` on the `ContainerItem` table. All the data in the column will be lost.
  - You are about to drop the column `inventory_id` on the `EquipmentItem` table. All the data in the column will be lost.
  - You are about to drop the `HeroStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[hero_id]` on the table `ContainerItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hero_id]` on the table `EquipmentItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hero_id` to the `ContainerItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hero_id` to the `EquipmentItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContainerItem" DROP CONSTRAINT "ContainerItem_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentItem" DROP CONSTRAINT "EquipmentItem_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "HeroStats" DROP CONSTRAINT "HeroStats_hero_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_hero_id_fkey";

-- DropIndex
DROP INDEX "ContainerItem_inventory_id_key";

-- DropIndex
DROP INDEX "EquipmentItem_inventory_id_key";

-- AlterTable
ALTER TABLE "ContainerItem" DROP COLUMN "inventory_id",
ADD COLUMN     "hero_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EquipmentItem" DROP COLUMN "inventory_id",
ADD COLUMN     "hero_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Hero" ADD COLUMN     "agi" DECIMAL(5,3) NOT NULL DEFAULT 10.0,
ADD COLUMN     "container_slots" SMALLINT DEFAULT 10,
ADD COLUMN     "hp" DECIMAL(5,3) NOT NULL DEFAULT 0.0,
ADD COLUMN     "hp_max" DECIMAL(5,3) NOT NULL DEFAULT 0.0,
ADD COLUMN     "int" DECIMAL(5,3) NOT NULL DEFAULT 10.0,
ADD COLUMN     "mp" DECIMAL(5,3) NOT NULL DEFAULT 0.0,
ADD COLUMN     "mp_max" DECIMAL(5,3) NOT NULL DEFAULT 0.0,
ADD COLUMN     "sta" DECIMAL(5,3) NOT NULL DEFAULT 10.0,
ADD COLUMN     "str" DECIMAL(5,3) NOT NULL DEFAULT 10.0,
ADD COLUMN     "vit" DECIMAL(5,3) NOT NULL DEFAULT 10.0,
ADD COLUMN     "wis" DECIMAL(5,3) NOT NULL DEFAULT 10.0;

-- DropTable
DROP TABLE "HeroStats";

-- DropTable
DROP TABLE "Inventory";

-- CreateIndex
CREATE UNIQUE INDEX "ContainerItem_hero_id_key" ON "ContainerItem"("hero_id");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentItem_hero_id_key" ON "EquipmentItem"("hero_id");

-- AddForeignKey
ALTER TABLE "EquipmentItem" ADD CONSTRAINT "EquipmentItem_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerItem" ADD CONSTRAINT "ContainerItem_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

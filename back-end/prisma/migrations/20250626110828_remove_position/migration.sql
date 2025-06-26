/*
  Warnings:

  - You are about to drop the column `position` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "position";

/*
  Warnings:

  - You are about to drop the column `hours` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `specialization_id` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `hours` to the `Lessonteached` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_specialization_id_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "hours",
DROP COLUMN "specialization_id";

-- AlterTable
ALTER TABLE "Lessonteached" ADD COLUMN     "hours" INTEGER NOT NULL;

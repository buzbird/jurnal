/*
  Warnings:

  - Added the required column `lesson_number` to the `DateOfLessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE dateoflessons_id_seq;
ALTER TABLE "DateOfLessons" ADD COLUMN     "cabinet_number" INTEGER,
ADD COLUMN     "lesson_number" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('dateoflessons_id_seq');
ALTER SEQUENCE dateoflessons_id_seq OWNED BY "DateOfLessons"."id";

-- CreateTable
CREATE TABLE "Cabinetnumber" (
    "id" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Cabinetnumber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DateOfLessons" ADD CONSTRAINT "DateOfLessons_cabinet_number_fkey" FOREIGN KEY ("cabinet_number") REFERENCES "Cabinetnumber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

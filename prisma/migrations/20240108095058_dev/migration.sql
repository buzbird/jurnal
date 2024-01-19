-- AlterTable
CREATE SEQUENCE assessmentoflessons_id_seq;
ALTER TABLE "AssessmentOfLessons" ALTER COLUMN "id" SET DEFAULT nextval('assessmentoflessons_id_seq');
ALTER SEQUENCE assessmentoflessons_id_seq OWNED BY "AssessmentOfLessons"."id";

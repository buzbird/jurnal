-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kurator" (
    "kurator_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Kurator_pkey" PRIMARY KEY ("kurator_id")
);

-- CreateTable
CREATE TABLE "Teachers" (
    "teacher_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "Lessonteached" (
    "id" INTEGER NOT NULL,
    "teacher_id" INTEGER,
    "group_id" INTEGER,
    "lesson_id" INTEGER NOT NULL,

    CONSTRAINT "Lessonteached_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL,
    "group_id" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person_permissions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "permission_id" INTEGER,

    CONSTRAINT "Person_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "permission_name" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specializations" (
    "id" SERIAL NOT NULL,
    "specializations_id" TEXT NOT NULL,
    "specializations_name" TEXT NOT NULL,

    CONSTRAINT "Specializations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "specialization_id" INTEGER,
    "kurator_id" INTEGER,
    "kurs" INTEGER,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "specialization_id" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateOfLessons" (
    "id" INTEGER NOT NULL,
    "lesson_id" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateOfLessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentOfLessons" (
    "id" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "student_id" INTEGER,
    "lesson_id" INTEGER,

    CONSTRAINT "AssessmentOfLessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Specializations_specializations_id_key" ON "Specializations"("specializations_id");

-- CreateIndex
CREATE UNIQUE INDEX "Specializations_specializations_name_key" ON "Specializations"("specializations_name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_group_name_key" ON "Group"("group_name");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_lesson_name_key" ON "Lesson"("lesson_name");

-- AddForeignKey
ALTER TABLE "Kurator" ADD CONSTRAINT "Kurator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessonteached" ADD CONSTRAINT "Lessonteached_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("teacher_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessonteached" ADD CONSTRAINT "Lessonteached_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessonteached" ADD CONSTRAINT "Lessonteached_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_permissions" ADD CONSTRAINT "Person_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_permissions" ADD CONSTRAINT "Person_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_kurator_id_fkey" FOREIGN KEY ("kurator_id") REFERENCES "Kurator"("kurator_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_specialization_id_fkey" FOREIGN KEY ("specialization_id") REFERENCES "Specializations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_specialization_id_fkey" FOREIGN KEY ("specialization_id") REFERENCES "Specializations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateOfLessons" ADD CONSTRAINT "DateOfLessons_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lessonteached"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentOfLessons" ADD CONSTRAINT "AssessmentOfLessons_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentOfLessons" ADD CONSTRAINT "AssessmentOfLessons_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "DateOfLessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

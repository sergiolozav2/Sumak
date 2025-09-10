-- CreateEnum
CREATE TYPE "public"."StudyCardType" AS ENUM ('Card', 'TrueOrFalse');

-- CreateTable
CREATE TABLE "public"."StudyCards" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "type" "public"."StudyCardType" NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "StudyCards_pkey" PRIMARY KEY ("id")
);

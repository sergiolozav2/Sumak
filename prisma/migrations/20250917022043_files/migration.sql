-- CreateTable
CREATE TABLE "public"."Files" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ocrDescription" TEXT,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

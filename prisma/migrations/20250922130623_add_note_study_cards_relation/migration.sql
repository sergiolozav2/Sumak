-- AlterTable
ALTER TABLE "public"."StudyCards" ADD COLUMN     "noteId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."StudyCards" ADD CONSTRAINT "StudyCards_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."Notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

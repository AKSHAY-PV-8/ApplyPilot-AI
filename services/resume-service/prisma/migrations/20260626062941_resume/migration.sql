/*
  Warnings:

  - You are about to drop the `GeneratedResume` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserResume` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GeneratedResume" DROP CONSTRAINT "GeneratedResume_userResumeId_fkey";

-- DropTable
DROP TABLE "GeneratedResume";

-- DropTable
DROP TABLE "UserResume";

-- DropEnum
DROP TYPE "JobStatus";

-- CreateTable
CREATE TABLE "ResumeFile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'uploaded',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeFile_pkey" PRIMARY KEY ("id")
);

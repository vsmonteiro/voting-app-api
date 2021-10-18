/*
  Warnings:

  - A unique constraint covering the columns `[emailToken]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "valid" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Token_emailToken_key" ON "Token"("emailToken");

/*
  Warnings:

  - The values [outcome] on the enum `categoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "categoryType_new" AS ENUM ('income', 'outcome');
ALTER TABLE "Category" ALTER COLUMN "type" TYPE "categoryType_new" USING ("type"::text::"categoryType_new");
ALTER TYPE "categoryType" RENAME TO "categoryType_old";
ALTER TYPE "categoryType_new" RENAME TO "categoryType";
DROP TYPE "categoryType_old";
COMMIT;

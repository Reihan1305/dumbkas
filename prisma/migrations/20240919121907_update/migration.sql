/*
  Warnings:

  - The values [red] on the enum `background` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "background_new" AS ENUM ('blue', 'yellow', 'green');
ALTER TABLE "Category" ALTER COLUMN "bgImg" TYPE "background_new" USING ("bgImg"::text::"background_new");
ALTER TYPE "background" RENAME TO "background_old";
ALTER TYPE "background_new" RENAME TO "background";
DROP TYPE "background_old";
COMMIT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "updateAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "updateAt" DROP NOT NULL;

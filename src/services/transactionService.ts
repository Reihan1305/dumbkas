import { Itransaction, IUpdateTransaction } from "../types/app";
import prisma from "../lib/prisma";

export default new (class transactionService {
  async createTransaction(body: Itransaction) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: body.userId },
        include: { wallet: true },
      });

      if (!user) {
        throw new Error("user not found");
      }

      let wallet = user.wallet;

      if (!wallet) {
        wallet = await prisma.wallet.create({
          data: {
            totalAmount: 0,
            userId: user.id,
          },
        });
      }

      const category = await prisma.category.findFirst({
        where: { id: body.categoryId },
      });

      if (!category) {
        throw new Error("category not found");
      }

      const createTransaction = await prisma.transaction.create({
        data: {
          walletId: wallet!.id,
          categoryId: category.id,
          totalTransaction: body.totalTransaction,
          createdAt: new Date(body.createdAt),
          information:body.information
        },
      });

      if (category.type === "income") {
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: {
            totalAmount:
              wallet.totalAmount + createTransaction.totalTransaction,
          },
        });
      } else {
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: {
            totalAmount:
              wallet.totalAmount - createTransaction.totalTransaction,
          },
        });
      }

      return createTransaction;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async getLastMonthTransaction(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { wallet: true },
      });

      if (!user) {
        throw new Error("user not found");
      }

      const wallet = user.wallet;

      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
        23,
        59,
        59,
        999
      );

      const transaction = await prisma.transaction.findMany({
        where: {
          walletId: wallet?.id,
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
        orderBy: { createdAt: "desc" },
      });
      if (transaction.length <= 0) {
        return "last month transaction not found";
      }

      return transaction;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async getThisMonthTransaction(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { wallet: true },
      });

      if (!user) {
        throw new Error("user not found");
      }

      const wallet = user.wallet;

      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      const transaction = await prisma.transaction.findMany({
        where: {
          walletId: wallet?.id,
          createdAt: {
            //greater than equal
            gte: startDate,
            //less than
            lt: endDate,
          },
        },
      });

      if (!transaction) {
        throw new Error("transaction this month not found");
      }

      return transaction;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async getFutureMonthTransaction(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { wallet: true },
      });

      if (!user) {
        throw new Error("user not found");
      }

      const wallet = user.wallet;

      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const endDate = new Date(
        today.getFullYear(),
        today.getMonth() + 2,
        0,
        23,
        59,
        59,
        999
      );

      const transaction = await prisma.transaction.findMany({
        where: {
          walletId: wallet?.id,
          createdAt: {
            //greater than equal
            gte: startDate,
            //less than
            lt: endDate,
          },
        },
      });

      if (!transaction) {
        throw new Error("transaction future month not found");
      }

      return transaction;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async UpdateTransaction(body: IUpdateTransaction, id: string,userId:string) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { wallet: true },
      });

      if (!user) {
        throw new Error("user not found");
      }

      const wallet = user.wallet;

      if (!wallet) {
        throw new Error("wallet not found");
      }
      const oldTransaction = await prisma.transaction.findFirst({
        where: { id, walletId: wallet?.id },
        include: {
          category: true,
        },
      });

      if (!oldTransaction) {
        throw new Error("transaction not found");
      }

      if (typeof body.totalTransaction === 'number' && body.totalTransaction > 0) {
        const updateData = oldTransaction.category.type === "income"
          ? { totalAmount: wallet.totalAmount + body.totalTransaction - oldTransaction.totalTransaction }
          : { totalAmount: wallet.totalAmount - body.totalTransaction + oldTransaction.totalTransaction };
  
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: {
            ...updateData,
            updateAt: new Date(),
          },
        });
      }

      if (typeof body.categoryId === "number") {
        const category = await prisma.category.findFirst({ where: { id: body.categoryId } });
        if (!category) {
          throw new Error("Category not found");
        }
      }
      
     await prisma.transaction.update({
        where: {
          id: oldTransaction.id,
          walletId: wallet.id,
        },
        data: body
      });


      return "update success";
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async deleteTransaction(userId: string, transactionId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { wallet: true },
      });

      if (!user) {
        throw new Error("user not found");
      }

      const wallet = user.wallet;

      if (!wallet) {
        throw new Error("wallet not found");
      }

      const oldTransaction = await prisma.transaction.findFirst({
        where: { id: transactionId },
        include: { category: true },
      });

      if (!oldTransaction) {
        throw new Error("transaction not found");
      }

      if (oldTransaction.category.type === "income") {
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: {
            totalAmount: wallet.totalAmount - oldTransaction.totalTransaction,
          },
        });
      } else {
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: {
            totalAmount: wallet.totalAmount + oldTransaction.totalTransaction,
          },
        });
      }

      await prisma.transaction.delete({
        where: { id: oldTransaction.id },
      });

      return "delete success";
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
})();

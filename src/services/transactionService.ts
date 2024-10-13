import { Itransaction, IUpdateTransaction } from "../types/app";
import prisma from "../lib/prisma";

export default new (class transactionService {
  async createTransaction(body: Itransaction, userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
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
          information: body.information,
        },
      });

      if (category.type === "income") {
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: {
            totalAmount:
              wallet.totalAmount + createTransaction.totalTransaction,
            updateAt: new Date(),
          },
        });
      } else if (category.type === "outcome") {
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: {
            totalAmount:
              wallet.totalAmount - createTransaction.totalTransaction,
            updateAt: new Date(),
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
        include:{
          category:true
        }
      });

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
            gte: startDate,
            lt: endDate,
          },
        },
        include:{
          category:true
        }
      });

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
            gte: startDate,
            lt: endDate,
          },
        },
        include:{
          category:true
        }
      });

      return transaction;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async detailTransaction(userId: string, transactionId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { wallet: true },
      });

      if (!user) throw new Error("user not found");

      if (!user.wallet) throw new Error("you dont have wallet");

      const transaction = await prisma.transaction.findFirst({
        where: { walletId: user.wallet.id, id: transactionId },
      });

      if (!transaction) throw new Error("transaction not found");

      return transaction;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async UpdateTransaction(
    body: IUpdateTransaction,
    id: string,
    userId: string
  ) {
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

      if (typeof body.categoryId === "number") {
        const category = await prisma.category.findFirst({
          where: { id: body.categoryId },
        });

        if (!category) {
          throw new Error("Category not found");
        }

        body.categoryId = category.id;
      }

      const updateTransaction = await prisma.transaction.update({
        where: {
          id: oldTransaction.id,
          walletId: wallet.id,
        },
        data: body,
        include: {
          category: true,
        },
      });

      console.log(typeof body.totalTransaction);
      if (oldTransaction.category.type !== updateTransaction.category.type) {
        if (typeof body.totalTransaction === "number") {
          const data =
            updateTransaction.category.type === "income"
              ? updateTransaction.totalTransaction +
                (wallet.totalAmount - oldTransaction.totalTransaction)
              : wallet.totalAmount -
                oldTransaction.totalTransaction -
                updateTransaction.totalTransaction;
          await prisma.wallet.update({
            where: { id: wallet.id },
            data: {
              totalAmount: data,
              updateAt: new Date(),
            },
          });
        } else {
          const data =
            updateTransaction.category.type === "income"
              ? wallet.totalAmount + 2 * oldTransaction.totalTransaction
              : wallet.totalAmount - 2 * oldTransaction.totalTransaction;

          await prisma.wallet.update({
            where: {
              id: wallet.id,
            },
            data: {
              totalAmount: data,
              updateAt: new Date(),
            },
          });
        }
      }
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

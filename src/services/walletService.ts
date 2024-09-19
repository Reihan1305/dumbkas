import prisma from "../lib/prisma";
import { Itransaction, IUpdateWallet } from "../types/app";

export default new (class walletService {
  async findUserWithWallet(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { wallet: true },
      });

      if (!user) {
        throw new Error("user not found");
      }

      return user;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async createWallet(userId: string) {
    try {
      const user = await this.findUserWithWallet(userId);

      if (user.wallet) {
        return "you alredy have wallet";
      }

      await prisma.wallet.create({
        data: {
          userId: userId,
          totalAmount: 0,
        },
      });

      return "wallet created";
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async findWallet(userId: string) {
    try {
      const user = await this.findUserWithWallet(userId);

      if (!user.wallet) {
        throw new Error("wallet not found");
      }

      return user.wallet;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async updateWallet(userId: string, data: IUpdateWallet) {
    try {
      const user = await this.findUserWithWallet(userId);

      if (!user.wallet) {
        throw new Error("wallet not found");
      }

      await prisma.wallet.update({ where: { id: user.wallet.id }, data });

      return "wallet updated";
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async getTransactionByDate(walletId: string, startDate: Date, endDate: Date) {
    try {
      const transaction = await prisma.transaction.findMany({
        where: {
          walletId: walletId,
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
        include: { category: true },
      });

      return transaction;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  incomeoutcomeSum(transaction: Itransaction[]) {
    try {
      let totalIncome = 0;
      let totaloutcome = 0;
      if (transaction.length > 0) {
        const incomeTransaction = transaction.filter((item) => {
          return item.category.type === "income";
        });
        if (incomeTransaction.length > 0) {
          const totalAmount = incomeTransaction.map((item) => {
            return item.totalTransaction;
          });
          totalIncome = totalAmount.reduce((acc, sum) => acc + sum, 0);
        }
        const outcomeTransaction = transaction.filter((item) => {
          return item.category.type === "outcome";
        });
        if (outcomeTransaction.length > 0) {
          const totalAmount = outcomeTransaction.map((item) => {
            return item.totalTransaction;
          });
          totaloutcome = totalAmount.reduce((acc, sum) => acc + sum, 0);
        }
      }

      return {
        totalIncome,
        totaloutcome,
      };
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async getFutureMonthbalance(userId: string) {
    try {
      const user = await this.findUserWithWallet(userId);

      if (!user.wallet) {
        throw new Error("wallet not found");
      }
      const walletAmount = user.wallet.totalAmount;

      const today = new Date();
      const startMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const endMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

      const getFutureMonthTransaction = await this.getTransactionByDate(
        user.wallet.id,
        startMonth,
        endMonth
      );

      const incomeoutcomeSum = this.incomeoutcomeSum(getFutureMonthTransaction);

      return {
        ...incomeoutcomeSum,
        balance: walletAmount,
      };
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async getThisMonthbalance(userId: string) {
    try {
      const user = await this.findUserWithWallet(userId);

      if (!user.wallet) {
        throw new Error("wallet not found");
      }
      const walletAmount = user.wallet.totalAmount;
      const futuremonth = await this.getFutureMonthbalance(userId);
      const sumFutureMonth = futuremonth.totalIncome - futuremonth.totaloutcome;

      const today = new Date();
      const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      const getThisMonthTransaction = await this.getTransactionByDate(
        user.wallet.id,
        startMonth,
        endMonth
      );

      const incomeoutcomeSum = this.incomeoutcomeSum(getThisMonthTransaction);
      const balance = walletAmount - sumFutureMonth;

      return {
        ...incomeoutcomeSum,
        balance,
      };
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async getLastMonthBalance(userId: string) {
    try {
      const user = await this.findUserWithWallet(userId);

      if (!user.wallet) {
        throw new Error("wallet not found");
      }

      const walletAmount = user.wallet.totalAmount;
      const thisMonth = await this.getThisMonthbalance(userId);
      const futureMonth = await this.getFutureMonthbalance(userId);

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
      const lastMontTransaction = await this.getTransactionByDate(
        user.wallet.id,
        startDate,
        endDate
      );

      const incomeoutcomeSum = this.incomeoutcomeSum(lastMontTransaction);

      const sumthisandFuture =
        thisMonth.totalIncome -
        thisMonth.totaloutcome +
        (futureMonth.totalIncome - futureMonth.totaloutcome);

      const balance = walletAmount - sumthisandFuture;

      return {
        ...incomeoutcomeSum,
        balance,
      };
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
})();

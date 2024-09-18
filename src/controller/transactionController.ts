import { Request, Response } from "express";
import {
  transaction,
  VupdateTransaction,
} from "../utils/validation/transaction";
import transactionService from "../services/transactionService";

export default new (class transactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const { error } = transaction.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const newtTransaction = await transactionService.createTransaction(
        req.body,
        res.locals.user.id
      );

      return res.status(201).json({
        status: true,
        data: newtTransaction,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error });
    }
  }

  async getLastMonthTransaction(req: Request, res: Response) {
    try {
      const lastMonthTransaction =
        await transactionService.getLastMonthTransaction(res.locals.user.id);

      return res.status(200).json({
        status: true,
        data: lastMonthTransaction,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error });
    }
  }

  async getThisMonthTransaction(req: Request, res: Response) {
    try {
      const lastMonthTransaction =
        await transactionService.getThisMonthTransaction(res.locals.user.id);

      return res.status(200).json({
        status: true,
        data: lastMonthTransaction,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error });
    }
  }

  async getFutureMonthTransaction(req: Request, res: Response) {
    try {
      const lastMonthTransaction =
        await transactionService.getFutureMonthTransaction(res.locals.user.id);

      return res.status(200).json({
        status: true,
        data: lastMonthTransaction,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error });
    }
  }

  async detailTransaction(req:Request,res:Response){
    try {
      const {transactionId} = req.params

      const transaction = await transactionService.detailTransaction(res.locals.user.id,transactionId)

      return res.status(200).json({
        status:true,
        data:transaction
      })
    } catch (error) {
      return res.status(500).json({Status:false,message:error})
    }
  }

  async updateTransaction(req: Request, res: Response) {
    try {
      const { transactionId } = req.params;

      const { error } = VupdateTransaction.validate(req.body);

      if (error) {
        return res
          .status(400)
          .json({ status: false, message: error.details[0].message });
      }
      req.body.updateAt = new Date()
      const updateTransaction = await transactionService.UpdateTransaction(
        req.body,
        transactionId,
        res.locals.user.id
      );

      
      return res.status(200).json({
        status: true,
        data: updateTransaction,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    try {
      const { transactionId } = req.params;

      await transactionService.deleteTransaction(
        res.locals.user.id,
        transactionId
      );

      return res.status(200).json({
        status: true,
        message: "delete success",
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error });
    }
  }
})();

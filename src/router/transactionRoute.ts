import { Router } from "express";
import transactionController from "../controller/transactionController";
import authMiddleware from "../middleware/authMiddleware";

const transactionRoute = Router()

transactionRoute.post('/create',authMiddleware.auth,transactionController.createTransaction)
transactionRoute.get('/lastmonth',authMiddleware.auth,transactionController.getLastMonthTransaction)
transactionRoute.get('/thismonth',authMiddleware.auth,transactionController.getThisMonthTransaction)
transactionRoute.get('/nextmonth',authMiddleware.auth,transactionController.getFutureMonthTransaction)
transactionRoute.get('/detail/:transactionId',authMiddleware.auth,transactionController.detailTransaction)
transactionRoute.put('/update/:transactionId',authMiddleware.auth,transactionController.updateTransaction)
transactionRoute.delete('/delete/:transactionId',authMiddleware.auth,transactionController.deleteTransaction)

export default transactionRoute
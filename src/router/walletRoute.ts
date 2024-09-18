import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import walletController from "../controller/walletController";

const walletRoute = Router()

walletRoute.post('/create',authMiddleware.auth,walletController.createWallet)
walletRoute.get('/futuremonth',authMiddleware.auth,walletController.getFutureMonth)
walletRoute.get('/thismonth',authMiddleware.auth,walletController.getThisMonth)
walletRoute.get('/lastmonth',authMiddleware.auth,walletController.getLastMonth)

export default walletRoute
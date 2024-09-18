import { Router } from "express";
import authRoute from "./userRoute";
import transactionRoute from "./transactionRoute";
import walletRoute from "./walletRoute";

const indexRouter = Router();

indexRouter.use("/user", authRoute);
indexRouter.use("/transaction",transactionRoute)
indexRouter.use("/wallet",walletRoute)

export default indexRouter;

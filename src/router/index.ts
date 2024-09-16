import { Router } from "express";
import authRoute from "./userRoute";
import transactionRoute from "./transactionRoute";

const indexRouter = Router();

indexRouter.use("/user", authRoute);
indexRouter.use("/transaction",transactionRoute)

export default indexRouter;

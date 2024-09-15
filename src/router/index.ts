import { Router } from "express";
import authRoute from "./userRoute";

const indexRouter = Router();

indexRouter.use("/user", authRoute);

export default indexRouter;

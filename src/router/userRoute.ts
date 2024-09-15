import { Router } from "express";
import authcontroller from "../controller/userController"
import authMiddleware from "../middleware/authMiddleware";
import userController from "../controller/userController";
const authRoute = Router()

authRoute.post('/register',authcontroller.register)
authRoute.post('/login',authcontroller.login)
authRoute.get('/userLogin',authMiddleware.auth,authcontroller.getLoginUser)
authRoute.get('/allUser',authcontroller.getAllUser)
authRoute.put('/update',authMiddleware.auth,userController.updateUser)


export default authRoute
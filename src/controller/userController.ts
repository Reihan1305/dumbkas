import { Request, Response } from "express";
import userServices from "../services/userService";
import { login, register } from "../utils/validation/auth";

export default new (class UserController {
  async register(req: Request, res: Response) {
    try {
      const { error } = register.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ status: false, message: error.details[0].message });
      }

      const newUser = await userServices.register(req.body);
      return res.status(201).json({
        status: true,
        message: "account created",
        data: {
          id: newUser.id,
          username: newUser.userName,
          email: newUser.email,
          walletId: newUser.wallet!.id,
        },
      });
    } catch (error) {
        const err = error as Error
      return res.status(500).json({ message: err.message });
    }
  }
  async login(req:Request,res:Response){
    try {
      const {error} = login.validate(req.body)
      if(error){
        return res.status(400).json({status:false,message:error.details[0].message})
      }

      const token = await userServices.login(req.body)

      return res.status(200).json({
        status:true,
        message:"login success",
        token
      })
    } catch (error) {
      const err = error as Error
      return res.status(500).json({message:err.message})
    }
  }

 async getLoginUser(req:Request,res:Response){
  try {
    const userId = res.locals.user.id

    const user = await userServices.getLoginUser(userId)
    
    return res.status(200).json({
      status:true,
      message:"get user login success",
      data:user
    })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({message:err.message})
  }
  }

  async getAllUser(req:Request,res:Response){
    try {
      const allUser = await userServices.getAllUser()

    return res.status(200).json({
      status:true,
      message:"get all user success",
      data:allUser
    })
    } catch (error) {
      const err = error as Error
      return res.status(500).json({message:err.message})
    }
  }
  
  async updateUser(req:Request,res:Response){
    try {
      const body = req.body
      const userId = res.locals.user.id

      await userServices.updateUser(body,userId)

      return res.status(200).json({
        status:true,
        message:"update success"
      })
    } catch (error) {
      const err = error as Error
      return res.status(500).json({message:err.message})
    }
  }
})();

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Iuser } from "../types/app";
import { User } from "@prisma/client";

export default new (class authMiddleware {
  auth(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = req.headers.authorization;
      const token = auth?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "unauthorize" });
      }

      const decode = jwt.verify(token, process.env.SECRET_KEY!) as Iuser;

      if (!decode) {
        return res.status(401).json({ message: "unauthorize" });
      }

      res.locals.user= decode;

      
      next();
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({
        message: err.message!,
      });
    }
  }

  checkAdminRole(req:Request,res:Response,next:NextFunction){
    try {
      const user : User = res.locals.user

      if(user.role !== "admin"){
        return res.status(400).json({message:"you are not admin"})
      }

      next()
    } catch (error) {
      return res.status(500).json({
        message:error
      })
    }
  }
})();

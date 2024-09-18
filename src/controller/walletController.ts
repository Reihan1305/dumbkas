import { Request, Response } from "express";
import walletService from "../services/walletService";

export default new class walletController{
    async createWallet(req:Request,res:Response){
        try {
            const userId = res.locals.user.id

            const newWallet = await walletService.createWallet(userId)
            return res.status(200).json({
                status:true,
                message:newWallet
            })
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:error
            })
        }
    }

    async findWallet(req:Request,res:Response){
        try {
            const userId = res.locals.user.id

            const wallet = await walletService.findWallet(userId)
            return res.status(200).json({
                status:true,
                message:wallet
            })
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:error
            })
        }
    }
    
    async getFutureMonth(req:Request,res:Response){
        try {
           const userId = res.locals.user.id
           
           const sumWallet = await walletService.getFutureMonthbalance(userId)

           return res.status(200).json({
            status:true,
            data:sumWallet
           })
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:error
            })
        }
    }

    async getThisMonth(req:Request,res:Response){
        try {
            const userId = res.locals.user.id

            const sumWallet = await walletService.getThisMonthbalance(userId)

            return res.status(200).json({
                status:true,
                data:sumWallet
            })
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:error
            })
        }
    }

    async getLastMonth(req:Request,res:Response){
        try {
            const userId = res.locals.user.id

            const sumWallet = await walletService.getLastMonthBalance(userId)

            return res.status(200).json({
                status:true,
                data:sumWallet
            })
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:error
            })
        }
    }
}
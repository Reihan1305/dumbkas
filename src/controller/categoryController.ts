import { Request, Response } from "express";
import categoryService from "../services/categoryService";

export default new class categoryController {
    async createCategory(req:Request,res:Response){
        try {
            const body = req.body
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            const image = files?.image?.[0];
            
            const newCategory = await categoryService.createCategory(body,{image})

            return res.status(201).json({
                status:true,
                data:newCategory
            })
        } catch (error) {
            return res.status(500).json({
                message:error
            })
        }
    }

    async findAll(req:Request,res:Response){
        try {
            const category = await categoryService.findAllCategory()

            return res.status(200).json({
                status:true,
                data:category
            })
        } catch (error) {
            return res.status(500).json({
                message:error
            })
        }
    }

    async findOne(req:Request,res:Response){
        try {
            const {id} = req.params

            const category = await categoryService.detailCategory(+id)

            return res.status(200).json({
                status:true,
                data:category
            })
        } catch (error) {
            return res.status(500).json({
                message:error
            })
        }
    }
    
    async updateCategory(req:Request,res:Response){
        try {
            const {id} = req.params
            const body = req.body
            const file = req.files as {"image":Express.Multer.File[]}
            const newCategory = await categoryService.updateCategory(+id,body,{image:file.image[0]})

            return res.status(201).json({
                status:true,
                data:newCategory
            })
        } catch (error) {
            return res.status(500).json({
                message:error
            })
        }
    }
}
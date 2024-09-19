import { background, categoryType } from "@prisma/client"
import prisma from "../lib/prisma"
import { Icategory, IUpdateCategory } from "../types/app"
import cloudinary from "../utils/cloudinary/config"
import { unlinkSync } from "fs"

export default new class categoryService{
    async createCategory(body:Icategory,file:{"image":Express.Multer.File}){
        try {
            if(!Object.values(categoryType).includes(body.type)){
                throw new Error("type not found")
            }

            if(!Object.values(background).includes(body.bgImg)){
                throw new Error("background not found")
            }

            if(!file){
                throw new Error("image not found")
            }

            const result = await cloudinary.uploader.upload(file.image.path,{
                folder:"dumbkas"
            })
            unlinkSync(file.image.path)

            body.imgUrl = result.secure_url

            const category = await prisma.category.create({
                data:body
            })

            return category
        } catch (error) {
            const err = error as Error
            throw new Error(err.message)
        }
    }

    async findAllCategory(){
        try {
            const category = await prisma.category.findMany()
            return category
        } catch (error) {
            const err = error as Error
            throw new Error(err.message)
        }
    }

    async detailCategory(id:number){
        try {
            const category = await prisma.category.findFirst({where:{id}})
            return category
        } catch (error) {
            const err = error as Error
            throw new Error(err.message)
        }
    }

    async updateCategory(id:number,body:IUpdateCategory,file:{"image":Express.Multer.File}){
        try{

            const oldCategory = await prisma.category.findFirst({where:{id}})

            if(!oldCategory){
                throw new Error("category not found")
            }
            if(!Object.values(background).includes(body.bgImg)){
                throw new Error("background not found")
            }

            if(!file){
                await prisma.category.update({where:{id:oldCategory.id},
                data:body
            })

            return "category updated"
            }
            
            const publicId = oldCategory.bgImg.split("/").pop()?.split(".")[0]
            cloudinary.uploader.destroy(publicId as string);

            const result = await cloudinary.uploader.upload(file.image.path,{
                folder:"dumbkas"
            })
            unlinkSync(file.image.path)

            body.imgUrl = result.secure_url

            await prisma.category.update({where:{id},
                data:body
            })

            return "category updated"
        }catch(error){
            const err = error as Error
            throw new Error(err.message)
        }
    }
}
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import uploadMiddleware from "../middleware/uploadMiddleware";
import categoryController from "../controller/categoryController";

const CategoryRoute = Router()

CategoryRoute.post("/create",authMiddleware.auth,authMiddleware.checkAdminRole,uploadMiddleware(),categoryController.createCategory)
CategoryRoute.get("/findAll",authMiddleware.auth,categoryController.findAll)
CategoryRoute.get("/detail/:id",authMiddleware.auth,categoryController.findOne)
CategoryRoute.put("/update/:id",authMiddleware.auth,authMiddleware.checkAdminRole,uploadMiddleware(),categoryController.createCategory)

export default CategoryRoute
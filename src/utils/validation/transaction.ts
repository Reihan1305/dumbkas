import Joi from "joi";

export const transaction = Joi.object({
    totalTransaction :Joi.number().required(),
    createdAt :Joi.string().required(),
    categoryId :Joi.number().required(),
    userId: Joi.string().required(),
    information :Joi.string().required()
})

export const VupdateTransaction = Joi.object({
    totalTransaction :Joi.number(),
    createdAt :Joi.string(),
    categoryId :Joi.number(),
    information :Joi.string()
})
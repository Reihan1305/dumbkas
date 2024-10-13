import * as yup from "yup"

const transactionSchema = yup.object({
    totalTransaction:yup.number().required(),
    createdAt:yup.date().required(),
    categoryId:yup.string().required(),
    information:yup.string().required()
})

export default transactionSchema
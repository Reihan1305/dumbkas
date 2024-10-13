import * as yup from "yup"

const registerSchema = yup.object({
    email:yup.string().email().required(),
    password:yup.string().min(8, 'Password minimal 8 karakter')
    .matches(/[a-z]/, 'Password harus mengandung setidaknya satu huruf kecil')
    .matches(/[A-Z]/, 'Password harus mengandung setidaknya satu huruf besar')
    .matches(/[0-9]/, 'Password harus mengandung setidaknya satu angka')
    .required('Password wajib diisi'),
    userName:yup.string().min(8).required()
})

export default registerSchema
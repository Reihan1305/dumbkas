import { useFormik } from "formik";
import registerSchema from "../../lib/validation/register";
import { ErrorResponse, useNavigate } from "react-router-dom";
import { Iregister } from "../../types/type";
import { API } from "../../lib/api";
import { AxiosError } from "axios";

const useRegister = () => {
  const navigate = useNavigate();
  const formik = useFormik<Iregister>({
    initialValues: {
      email: "",
      password: "",
      userName: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) => {
      try { 
        await API.post('/user/register', values);
        alert('register success')
        resetForm();
        navigate('/auth/login');
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>
        alert(err.response?.data?.data)
      }
    },
  });

  return  formik ;
}

export default useRegister;

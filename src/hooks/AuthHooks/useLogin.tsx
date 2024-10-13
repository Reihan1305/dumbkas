import React from "react";
import { useAppDispatch } from "../../store/store";
import { useFormik } from "formik";
import loginSchema from "../../lib/validation/login";
import { Ilogin } from "../../types/type";
import { loginAsync } from "../../store/asyncThunks/authAsync";

interface Toast {
  isOpen: boolean;
  message: string;
  background: string;
}

const useLogin = () => {
  const dispatch = useAppDispatch();

  const [openToast, setOpenToast] = React.useState<Toast>({
    isOpen: false,
    background: "",
    message: "",
  });

  const closeToast = () => {
    setOpenToast({
      isOpen: false,
      background: "",
      message: "",
    });
  };

  const openingToast = (message: string, background: string) => {
    setOpenToast({
      isOpen: true,
      background,
      message,
    });

    setTimeout(() => {
      closeToast();
    }, 5000);
  };

  const formik = useFormik<Ilogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(loginAsync(values));

        openingToast("Login Successful", "bg-green-500");

        resetForm();
      } catch (error) {
        const err = error as Error
        alert(err.message)
      }
    },
  });

  return {
    formik,
    openToast,
    closeToast,
  };
};

export default useLogin;

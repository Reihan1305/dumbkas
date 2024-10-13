import { useFormik } from "formik";
import transactionSchema from "../../lib/validation/transaction";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { getAllCategory } from "../../store/asyncThunks/categoryAsync";
import {
  getLastMonthBalance,
  getNextMonthBalance,
  getThisMonthBalance,
} from "../../store/asyncThunks/balanceAsync";
import {
  getLastMonthTransaction,
  getNextMonthTransaction,
  getThisMonthTransaction,
} from "../../store/asyncThunks/transactionAsync";
import { useNavigate } from "react-router-dom";
import { API } from "../../lib/api";
import { AxiosError } from "axios";

const useAddTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const categoryOption = category.category.map((items) => ({
    name: items.name,
    id: items.id,
  }));

  const refreshTransaction = async (date: string) => {
    const currentMonth = new Date().getMonth();
    const transactionMonth = new Date(date).getMonth();

    try {
      if (transactionMonth === currentMonth - 1) {
        await dispatch(getLastMonthBalance());
        await dispatch(getLastMonthTransaction());
        navigate("/main/lastmonth");
      } else if (transactionMonth === currentMonth) {
        await dispatch(getThisMonthBalance());
        await dispatch(getThisMonthTransaction());
        navigate("/main/thismonth");
      } else {
        await dispatch(getNextMonthBalance());
        await dispatch(getNextMonthTransaction());
        navigate("/main/futuremonth");
      }
    } catch (error) {
      console.error("Error fetching transaction data: ", error);
    }
  };

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');        
    const year = date.getFullYear();                            
    return `${month}-${day}-${year}`;                           
  };
  
  const formik = useFormik({
    initialValues: {
      totalTransaction: 0,
      createdAt: new Date().toISOString().split("T")[0], 
      categoryId: "1",
      information: "",
    },
    validationSchema: transactionSchema,
    onSubmit: async (values, { resetForm }) => {
      const formattedDate = formatDate(values.createdAt); 

      const payload = {
        totalTransaction: values.totalTransaction,
        createdAt: formattedDate,
        categoryId: parseInt(values.categoryId),
        information: values.information,
      };
  
      console.log(payload);
  
      try {
        await API.post("/transaction/create", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        refreshTransaction(values.createdAt);
        resetForm();
      } catch (error) {
        const err = error as AxiosError
        console.error("Error creating transaction:", err.response?.data || error);
      }
    },
  });
  
  return {
    formik,
    categoryOption,
  };
};

export default useAddTransaction;

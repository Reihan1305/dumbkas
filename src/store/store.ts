import { configureStore } from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux"
import authReducer from "./slice/authSlice";
import transactionReducer from "./slice/transactionSlice"
import balanceReducer from "./slice/balanceSlice"
import categoryReducer from "./slice/categorySlice"
const store = configureStore({
    reducer:{
        auth :authReducer,
        transaction:transactionReducer,
        balance:balanceReducer,
        category:categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store


import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse, Transaction } from "../../types/type";
import { AxiosError } from "axios";
import { API } from "../../lib/api";


export const getLastMonthTransaction = createAsyncThunk<
Transaction[],
    void,
    { rejectValue: string }>("lastMonthTransaction",async(_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const bearer = `Bearer ${token}`

            const {data} = await API.get("/transaction/lastmonth",{
                headers:{
                    Authorization:bearer
                }
            })

            console.log(data.data)

            return data.data
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>
            alert(err.response?.data.message)
            return rejectWithValue("error")
        }
    })

export const getThisMonthTransaction = createAsyncThunk<
    Transaction[],
    void,
    { rejectValue: string }>("thisMonthTransaction",async(_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const bearer = `Bearer ${token}`

            const {data} = await API.get("/transaction/thismonth",{
                headers:{
                    Authorization:bearer
                }
            })

            console.log(data.data)

            return data.data
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>
            alert(err.response?.data.message)
            return rejectWithValue("error")

        }
    })
export const getNextMonthTransaction = createAsyncThunk<
Transaction[] ,
    void,
    { rejectValue: string }>("nextMonthTransaction",async(_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const bearer = `Bearer ${token}`

            const {data} = await API.get("/transaction/nextmonth",{
                headers:{
                    Authorization:bearer
                }
            })

            console.log(data.data)

            return data.data
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>
            alert(err.response?.data.message)
            return rejectWithValue("error")

        }
    })

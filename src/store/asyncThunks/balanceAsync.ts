import { createAsyncThunk } from "@reduxjs/toolkit"
import { ErrorResponse, IBalance } from "../../types/type"
import { API } from "../../lib/api"
import { AxiosError } from "axios"

export const getLastMonthBalance = createAsyncThunk<
    IBalance,
    void,
    { rejectValue: string }>("balanceLastMonth",async(_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const bearer = `Bearer ${token}`

            const {data} = await API.get("/wallet/lastmonth",{
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

export const getThisMonthBalance = createAsyncThunk<
    IBalance,
    void,
    { rejectValue: string }>("balancethisMonth",async(_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const bearer = `Bearer ${token}`

            const {data} = await API.get("/wallet/thismonth",{
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
export const getNextMonthBalance = createAsyncThunk<
    IBalance,
    void,
    { rejectValue: string }>("balanceNextMonth",async(_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const bearer = `Bearer ${token}`

            const {data} = await API.get("/wallet/futuremonth",{
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
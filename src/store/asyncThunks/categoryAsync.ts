import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category, ErrorResponse } from "../../types/type";
import { AxiosError } from "axios";
import { API } from "../../lib/api";

export const getAllCategory = createAsyncThunk<
Category[],
void,
{rejectValue:string}>("getAllCategory",async(_,{rejectWithValue})=>{
    try {
        const token = localStorage.getItem("token")
        const bearer = `Bearer ${token}`
        const {data} = await API.get("/category/findall",{
            headers:{
                Authorization:bearer
            }
        })

        return data.data
    } catch (error) {
        const err = error as AxiosError<ErrorResponse>
        alert(err.response?.data.message)
        return rejectWithValue
    }
})
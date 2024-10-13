import { createSlice } from "@reduxjs/toolkit";
import { Iprofile } from "../../types/type";
import { getProfileAsync, loginAsync, logoutAsync } from "../asyncThunks/authAsync";

interface IUserState{
    isLogin:boolean,
    token :string,
    profile:Iprofile
}

const storedToken = localStorage.getItem("token")
const initialLogin = storedToken ? true : false;

const initialState :IUserState = {
    isLogin:initialLogin,
    token:storedToken || "",
    profile:{} as Iprofile
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        LOGIN:(state,action)=>{
            console.log("FROM LOGIN ACTION",action.payload)
            state.isLogin = true;
            state.token = action.payload.token;
            state.profile = action.payload.profile;
        }
    },
    extraReducers(builder) {
        builder.addCase(loginAsync.pending,(_,action)=>{
            console.log("pending",action)
        })
        builder.addCase(loginAsync.fulfilled,(state,action)=>{
            state.isLogin = true;
            state.token = action.payload;
        })
        builder.addCase(loginAsync.rejected,(_,action)=>{
            console.log("rejected",action)
        })

        builder.addCase(getProfileAsync.pending,(_,action)=>{
            console.log("pending",action)
        })
        builder.addCase(getProfileAsync.fulfilled,(state,action)=>{
            state.isLogin = true;
            state.profile = action.payload
        })
        builder.addCase(getProfileAsync.rejected,(_,action)=>{
            console.log("rejected",action)
        })

        
        builder.addCase(logoutAsync.fulfilled,(state)=>{
            state.isLogin = false;
            state.token = "";
            state.profile = {} as Iprofile
        })
        builder.addCase(logoutAsync.rejected,(_,action)=>{
            console.log("rejected", action)
        })
    },
})

export const {LOGIN} = authSlice.actions
export default authSlice.reducer

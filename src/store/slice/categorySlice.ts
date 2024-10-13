import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/type";
import { getAllCategory } from "../asyncThunks/categoryAsync";

interface categoryState{
    category:Category[];
    loading:boolean;
    error:null | string
}

const initialState:categoryState={
    category:[],
    loading:false,
    error:null
}

const categorySlice = createSlice({
    name:"categorySlice",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getAllCategory.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(getAllCategory.fulfilled,(state,action)=>{
            state.loading = false
            state.error = null
            state.category = action.payload
        })
        builder.addCase(getAllCategory.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload!
        })
    },
})

export default categorySlice.reducer
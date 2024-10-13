import { createSlice } from "@reduxjs/toolkit";
import { IBalance } from "../../types/type";
import { getLastMonthBalance, getNextMonthBalance, getThisMonthBalance } from "../asyncThunks/balanceAsync";

interface BalanceState {
    lastMontBalance: IBalance;
    thisMonthBalance: IBalance;
    nextMonthBalance: IBalance;
    loading:boolean;
    error:null|string
}

const initialState :BalanceState = {
    lastMontBalance : {} as IBalance,
    thisMonthBalance : {} as IBalance,
    nextMonthBalance : {} as IBalance,
    loading:false,
    error:null
}

const balanceSlice = createSlice({
    name:"balance",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getLastMonthBalance.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(getLastMonthBalance.fulfilled,(state,action)=>{
            state.lastMontBalance = action.payload;
            state.loading = false;
            state.error = null
        })
        builder.addCase(getLastMonthBalance.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || "cant fetch last month balance"
        })

        builder.addCase(getThisMonthBalance.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(getThisMonthBalance.fulfilled,(state,action)=>{
            state.thisMonthBalance = action.payload;
            state.loading = false;
            state.error = null
        })
        builder.addCase(getThisMonthBalance.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || "cant fetch this month balance"
        })

        builder.addCase(getNextMonthBalance.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(getNextMonthBalance.fulfilled,(state,action)=>{
            state.nextMonthBalance = action.payload;
            state.loading = false;
            state.error = null
        })
        builder.addCase(getNextMonthBalance.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || "cant fetch next month balance"
        })
    },
})

export default balanceSlice.reducer
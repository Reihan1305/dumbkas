import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../types/type";
import { getNextMonthTransaction, getLastMonthTransaction, getThisMonthTransaction } from "../asyncThunks/transactionAsync";

interface tranasctionState {
  lastMonthTransaction: Transaction[];
  thisMonthTransaction: Transaction[];
  nextMonthTransaction: Transaction[];
  loading: boolean;
  error: null | string;
}

const initialState: tranasctionState = {
  lastMonthTransaction: [],
  thisMonthTransaction: [],
  nextMonthTransaction: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLastMonthTransaction.pending,(state)=>{
        state.loading = true
        state.error = null
    })
    builder.addCase(getLastMonthTransaction.fulfilled,(state,action)=>{
        state.lastMonthTransaction = action.payload;
        state.loading = false;
        state.error = null
    })
    builder.addCase(getLastMonthTransaction.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload || "Failed to fetch last month's transactions"
    })
    
    builder.addCase(getThisMonthTransaction.pending,(state)=>{
        state.loading = true
        state.error = null
    })
    builder.addCase(getThisMonthTransaction.fulfilled,(state,action)=>{
        state.thisMonthTransaction = action.payload;
        state.loading = false;
        state.error = null
    })
    builder.addCase(getThisMonthTransaction.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload || "Failed to fetch this month's transactions"
    })

    builder.addCase(getNextMonthTransaction.pending,(state)=>{
        state.loading = true
        state.error = null
    })
    builder.addCase(getNextMonthTransaction.fulfilled,(state,action)=>{
        state.nextMonthTransaction = action.payload;
        state.loading = false;
        state.error = null
    })
    builder.addCase(getNextMonthTransaction.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload || "Failed to fetch next month's transactions"
    })
  },
});

export default transactionSlice.reducer

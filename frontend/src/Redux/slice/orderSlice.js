import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../actions/orderAction";

export const newOrderSlice = createSlice({
    name:'order',
    initialState:{
        user:[],
        loading:false,
        error:null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
         .addCase(createOrder.pending, (state) => {
            state.loading = true;
            state.error = null
         })
         .addCase(createOrder.fulfilled , (state , action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null
         })
         .addCase(createOrder.rejected, (state , action) => {
            state.loading = false;
            state.error = action.payload;
         })
    }
    
})
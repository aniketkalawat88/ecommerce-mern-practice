import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getAllOrders, getOrderDetails, myOrder } from "../actions/orderAction";

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


export const myOrderSlice = createSlice({
   name:'order',
   initialState:{
       orders:[],
       loading:false,
       error:null,
   },
   reducers: {},
   extraReducers: (builder) => {
       builder
        .addCase(myOrder.pending, (state) => {
           state.loading = true;
           state.error = null
        })
        .addCase(myOrder.fulfilled , (state , action) => {
           state.loading = false;
           state.orders = action.payload;
           state.error = null
        })
        .addCase(myOrder.rejected, (state , action) => {
           state.loading = false;
           state.error = action.payload;
        })
   }
   
})

export const orderDetailSlice = createSlice({
   name:'order',
   initialState:{
      order:{},
      loading:false,
      error:null,
   } ,
   reducers:{},
   extraReducers: (builder) => {
      builder
       .addCase( getOrderDetails.pending, (state ,action) => {
         state.loading = true;
         state.error = null
       })
       .addCase(getOrderDetails.fulfilled , (state , action) => {
         state.loading = false;
         state.order = action.payload
         state.error = null
       })
       .addCase(getOrderDetails.rejected , (state , action) => {
         state.loading = false
         state.error = action.payload
       })
   }
})

export const orderSlice = createSlice({
   name:'order',
   initialState:{
      order:{},
      loading:false,
      error:null,
   } ,
   reducers:{},
   extraReducers: (builder) => {
      builder
       .addCase( getAllOrders.pending, (state ,action) => {
         state.loading = true;
         state.error = null
       })
       .addCase(getAllOrders.fulfilled , (state , action) => {
         state.loading = false;
         state.order = action.payload
         state.error = null
       })
       .addCase(getAllOrders.rejected , (state , action) => {
         state.loading = false
         state.error = action.payload
       })
   }
})
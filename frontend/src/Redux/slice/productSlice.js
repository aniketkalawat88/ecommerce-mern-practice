import { createSlice } from "@reduxjs/toolkit";
import { getProductDetails, getProducts } from "../actions/productActions";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

 export const productDetailSlice = createSlice({
  name:"productDetails",
  initialState: {
    items:[],
    loading : false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder 
    .addCase( getProductDetails.pending , (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase( getProductDetails.fulfilled , (state , action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase( getProductDetails.rejected , (state , action) => {
      state.loading = false;
      state.error = action.payload
    })
  }

})



export default productSlice.reducer;
// export const productDetailReducer = productDetailSlice.reducer;
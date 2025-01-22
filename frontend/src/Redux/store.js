import { configureStore } from "@reduxjs/toolkit";
import productSlice, { productDetailSlice } from "./slice/productSlice";

export const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails : productDetailSlice.reducer
    }
})
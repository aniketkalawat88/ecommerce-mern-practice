import { configureStore } from "@reduxjs/toolkit";
import productSlice, { productDetailSlice } from "./slice/productSlice";
import { userSlice } from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails : productDetailSlice.reducer,
        user: userSlice.reducer,
    }
})
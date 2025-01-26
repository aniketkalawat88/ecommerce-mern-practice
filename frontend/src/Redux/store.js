import { configureStore } from "@reduxjs/toolkit";
import productSlice, { productDetailSlice } from "./slice/productSlice";
import { userSlice } from "./slice/userSlice";
import { profileSlice } from "./slice/profileSlice";

export const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails : productDetailSlice.reducer,
        user: userSlice.reducer,
        profile: profileSlice.reducer
    }
})
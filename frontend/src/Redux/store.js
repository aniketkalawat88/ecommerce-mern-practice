import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice, { newProductSlice, newReviewSlice, productDetailSlice } from "./slice/productSlice";
import { allUserSlice, getUserSlice, userSlice } from "./slice/userSlice";
import { forgotPasswordSlice, profileSlice } from "./slice/profileSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { cartSlice } from "./slice/cartSlice";
import { myOrderSlice, newOrderSlice, orderDetailSlice, orderSlice } from "./slice/orderSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
    products: productSlice,
    productDetails: productDetailSlice.reducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    updatePassword : forgotPasswordSlice.reducer,
    cart: cartSlice.reducer,
    newOrder: newOrderSlice.reducer,
    myOrder : myOrderSlice.reducer,
    orderDetails : orderDetailSlice.reducer,
    newReview: newReviewSlice.reducer,
    newProduct : newProductSlice.reducer,
    order: orderSlice.reducer,
    allUsers:allUserSlice.reducer,
    getUser:getUserSlice.reducer,
    
  })

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

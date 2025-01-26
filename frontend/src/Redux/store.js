import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice, { productDetailSlice } from "./slice/productSlice";
import { userSlice } from "./slice/userSlice";
import { forgotPasswordSlice, profileSlice } from "./slice/profileSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

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
  })

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

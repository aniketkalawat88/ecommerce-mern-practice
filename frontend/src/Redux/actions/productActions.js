import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("getProducts" , async ( args , {rejectWithValue}) => {
    const response = await fetch("http://localhost:4000/api/v1/products")
    try{
        const result = await response.json();
        // console.log(result.products)
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})

export const getProductDetails = createAsyncThunk("getProductDetails" , async ( id , { rejectWithValue }) => {
    const response = await fetch(`http://localhost:4000/api/v1/product/${id}`);
    try {
        const result = await response.json();
        // console.log(result.product,"ertyui")
        return result.product;
    } catch (error) {
        return rejectWithValue(error)
    }
})
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const getProducts = createAsyncThunk("getProducts" , async ( args , {rejectWithValue}) => {
//     const response = await fetch("http://localhost:4000/api/v1/products")
//     try{
//         const result = await response.json();
//         // console.log(result.products)
//         return result;
//     }catch(error){
//         return rejectWithValue(error)
//     }
// })


export const getProducts = createAsyncThunk("getProducts" , async ( {keyword="" , currentPage=1 , price=[0,25000] , category , ratings=0} , {rejectWithValue}) => {
    let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    if(category){
        link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    }

    const response = await fetch(link)
    try{
        const result = await response.json();
        // console.log(result.products)
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})


// Get Product Details
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


// New Review
export const newReview = createAsyncThunk("newReview" , async ( {rating, comment ,productId} , {rejectWithValue}) => {
    const config = {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        credentials: "include",
        body: JSON.stringify({ rating, comment, productId }), // Corrected
    };
    try {
        const response = await fetch("http://localhost:4000/api/v1/review" ,config);
        const result = await response.json();
        // console.log(result,"ertyui")
        return result;
    } catch (error) {
        console.log(error,"error hai")
        return rejectWithValue(error)
    }
})
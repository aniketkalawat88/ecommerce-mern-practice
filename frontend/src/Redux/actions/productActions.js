import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const getProducts = createAsyncThunk("getProducts" , async ( args , {rejectWithValue}) => {
//     const response = await fetch("http://localhost:4000/api/v1/products")
    // try{
    //     const result = await response.json();
    //     // console.log(result.products)
    //     return result;
    // }catch(error){
    //     return rejectWithValue(error)
    // }
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

// Get All Product for Admin
export const getAdminProduct = createAsyncThunk("getAdminProduct" , async(args , {rejectWithValue}) => {
    const response = await fetch("http://localhost:4000/api/v1/admin/products", {
        credentials: "include",
    })
    try{
        const result = await response.json();
        // console.log(result.products)
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})

// Create Product
export const createProduct = createAsyncThunk("newReview" , async ( myForm , {rejectWithValue}) => {
    const config = {
        method: "POST",
        credentials: "include", 
        body: myForm,
      };
    try {
        const response = await fetch("http://localhost:4000/api/v1/admin/product/new" ,config);
        const result = await response.json();
        // console.log(result,"ertyui")
        return result;
    } catch (error) {
        console.log(error,"error hai")
        return rejectWithValue(error)
    }
})

// Delete Product
export const deleteProduct = createAsyncThunk("newReview" , async ( id , {rejectWithValue}) => {
    const config = {
        method: "DELETE",
        credentials: "include", 
        headers: {
            "Content-Type": "application/json"
        }
      };
    try {
        const response = await fetch(`http://localhost:4000/api/v1/admin/product/${id}` ,config);
        const result = await response.json();
        // console.log(result,"delete success")
        return result;
    } catch (error) {
        console.log(error,"error hai")
        return rejectWithValue(error)
    }
})

// Update Product
export const updateProduct = createAsyncThunk("updateProduct", async ({ id, myForm }, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:4000/api/v1/admin/product/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myForm) 
        });
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.error("Update Error:", error);
        return rejectWithValue(error);
    }
});


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

export const getAllReviews = createAsyncThunk(
    "reviews/getAll",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/v1/reviews?id=${id}`);
        console.log(data,"dfghjk")
        return data.reviews;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  
  // Delete Review of a Product
  export const deleteReview = createAsyncThunk(
    "reviews/delete",
    async ({ reviewId, productId }, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `http://localhost:4000/api/v1/reviews?id=${reviewId}&productId=${productId}`
        );
        // console.log(data,"dfghj")
        return data.success;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
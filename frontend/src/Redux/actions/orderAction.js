import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensures cookies are sent if required
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/order/new",
        order,
        config
      );
    //   console.log(data)

      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Order creation failed");
    }
  }
);

export const myOrder = createAsyncThunk( "myOrder", async ( args, { rejectWithValue }) => {
    try {
      const data = await axios.get("http://localhost:4000/api/v1/orders/me" , {
        withCredentials: true
      });
      // console.log(data.data.orders,"drtyuji")
      
      return data.data.orders; 
    } catch (error) {
      console.log(error,"my order error ")
      return rejectWithValue(error.response?.data?.message || "Order creation failed");
    }
  }
);


// Get Order Details
export const getOrderDetails = createAsyncThunk("getOrderDetails", async ( id , { rejectWithValue }) => {
  try {
    const data = await axios.get(`http://localhost:4000/api/v1/order/${id}` , {
      withCredentials: true
    });
    // console.log(data,"fghjkhgfyu") 
    return data?.data?.order   
  } catch (error) {
    console.log(error,"my order error ")
    return rejectWithValue(error.response?.data?.message || "Order creation failed");
  }
})

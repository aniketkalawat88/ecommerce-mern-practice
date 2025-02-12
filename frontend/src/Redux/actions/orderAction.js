import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Order
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

// Update Order
export const updateOrder = createAsyncThunk(
  "updateOrder",
  async ({order,id}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensures cookies are sent if required
      };

      const { data } = await axios.put(
        `http://localhost:4000/api/v1/admin/order/${id}`,
        order,
        config
      );
      // console.log(data , "sdfghjk")

      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Order creation failed");
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  "createOrder",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensures cookies are sent if required
      };

      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/admin/order/${id}`,
        config
      );
      console.log(data)

      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Order creation failed");
    }
  }
);

// My Orders
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


// Get All Orders (Admin)
export const getAllOrders = createAsyncThunk( "myOrder", async ( args, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/admin/orders" , {
      withCredentials: true
    });
    // console.log(data.orders,"drtyuji")
    
    return data.orders; 
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

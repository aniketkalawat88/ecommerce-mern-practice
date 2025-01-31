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

      return data; // Return response data for Redux state update
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Order creation failed");
    }
  }
);

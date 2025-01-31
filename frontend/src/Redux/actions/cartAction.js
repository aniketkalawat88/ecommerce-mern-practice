import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for adding items to cart
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { getState }) => {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/product/${id}`
    );
    const item = {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    };

    // console.log(data, "dasdsadaskjdb");

    // Save cart to localStorage
    const cartItems = getState().cart.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    return item;
  }
);


// SAVE SHIPPING INFO
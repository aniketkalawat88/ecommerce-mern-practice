import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to login");
      }

      const result = await response.json();
      // console.log(result, "Login Response");
      return result;
    } catch (error) {
      console.error("Login Error:", error);
      return rejectWithValue(error.message || "Network Error");
    }
  }
);


export const register = createAsyncThunk( "register" , async ({name , email , password , avatar} , { rejectWithValue}) => {
  try{
    const response = await fetch("http://localhost:4000/api/v1/register" , {
      method:"POST",
      headers : {
        "Content-Type":"multipart/form-data"
      },
      body: JSON.stringify({name , email , password})
    })
    if(!response.ok){
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to login");
    }

    const result = await response.json();
    console.log(result , "register success")

  }
  catch(error){
    console.error("Login Error:", error);
    return rejectWithValue(error.message || "Network Error");
  }
})
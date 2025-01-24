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
        credentials: "include"
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
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name , email , password , avatar})
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


// load user
export const loadUser = createAsyncThunk( "user/loaduser", async (args, { rejectWithValue }) => {
  try {
    // const response = await fetch("http://localhost:4000/api/v1/me");
    const response = await fetch("http://localhost:4000/api/v1/me", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });

    const result = await response.json();
    // console.log(result,"dsdsfd")
    return result;
  } catch (error) {
    return rejectWithValue(error.message || "Network Error");
  }
}
);

// Logout 
export const logout = createAsyncThunk("logout", async( args , { rejectWithValue }) => {
  try{
    await fetch("http://localhost:4000/api/v1/logout" , {
      method:"GET",
      credentials:"include",
    });

  } catch(error){
    return rejectWithValue(error.message || "Network Error");
    
  }
})
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


// Update Profile
export const updateProfile = createAsyncThunk( "updateProfile" , async ({name , email , avatar} , { rejectWithValue}) => {
  try{
    const response = await fetch("http://localhost:4000/api/v1/me/update" , {
      method:"PUT",
      headers : {
        "Content-Type":"application/json",
      },
      credentials: "include",
      body: JSON.stringify({name , email , avatar})
    })
    if(!response.ok){
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to login");
    }

    const result = await response.json();
    console.log(result , "profile Update succesfully")

  }
  catch(error){
    console.error("Update profile error:", error);
    return rejectWithValue(error.message || "Network Error");
  }
})


// updatePassword
export const updatePassword = createAsyncThunk( "updatePassword" , async ({oldPassword , newPassword , confirmPassword} , {rejectWithValue}) => {
  try{
    const response = await fetch("http://localhost:4000/api/v1/password/update" , {
      method:"PUT",
      credentials:"include",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({oldPassword , newPassword , confirmPassword})
    })
    if(!response.ok){
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to updatePassword");
    }

    const result = await response.json();
    console.log(result , "Update Password succesfully")

  }
  catch(error){
    console.error("Update passwprd error:", error);
    return rejectWithValue(error.message || "Network Error");
  }
})


export const getAllUsers = createAsyncThunk( "getAllUsers", async (args, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/admin/users", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });

    const result = await response.json();
    // console.log(result,"dsdsfd")
    return result.users;
  } catch (error) {
    return rejectWithValue(error.message || "Network Error");
  }
}
);

// Get all user Details
export const getUserDetails = createAsyncThunk( "getUserDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/admin/users/${id}`, {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });

    const result = await response.json();
    // console.log(result,"dsdsfd")
    return result.user;
  } catch (error) {
    return rejectWithValue(error.message || "Network Error");
  }
}
);

// Delete User
export const deleteUser = createAsyncThunk("deleteUser" , async ( id , {rejectWithValue}) => {
  const config = {
      method: "DELETE",
      credentials: "include", 
      headers: {
          "Content-Type": "application/json"
      }
    };
  try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/users/${id}` ,config);
      const result = await response.json();
      // console.log(result,"delete success")
      return result;
  } catch (error) {
      console.log(error,"error hai")
      return rejectWithValue(error)
  }
})

// Update User
export const updateUser = createAsyncThunk("updateUser" , async ( {id , myForm} , {rejectWithValue}) => {
  const config = {
      method: "PUT",
      credentials: "include", 
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(myForm)
    };
  try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/users/${id}` ,config);
      const result = await response.json();
      console.log(result,"Update success")
      return result;
  } catch (error) {
      console.log(error,"error hai")
      return rejectWithValue(error)
  }
})

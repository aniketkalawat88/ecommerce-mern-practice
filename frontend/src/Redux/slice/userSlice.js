import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../actions/userActions";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        items:[],
        loading:false,
        error:null,
        isAuthenticated:false,
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(login.pending , (state) => {
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
        })
        .addCase(login.fulfilled , (state , action) => {
            state.loading = false;
            state.items.push(action.payload)
            state.isAuthenticated = true;
        })
        .addCase(login.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload
            state.isAuthenticated = false;
        })
        .addCase(register.pending , (state) => {
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
        })
        .addCase(register.fulfilled , (state , action) => {
            state.loading = false;
            state.items.push(action.payload)
            state.isAuthenticated = true;
        })
        .addCase(register.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload
            state.isAuthenticated = false;
        })
    }
})
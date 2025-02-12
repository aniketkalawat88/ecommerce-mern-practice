import { createSlice } from "@reduxjs/toolkit";
import { updatePassword, updateProfile } from "../actions/userActions";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: [],
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const forgotPasswordSlice = createSlice({
  name:"forgetpassword",
  initialState: {
    profile:[],
    loading:false,
    error:null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(updatePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
  }

})
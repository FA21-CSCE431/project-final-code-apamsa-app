import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    googleID: "",
    email: "",
    imgURL: "",
    admin: false,
    userID: "",
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.googleID = action.payload.googleID;
      state.email = action.payload.email;
      state.imgURL = action.payload.imgURL;
      state.admin = action.payload.admin;
      state.userID = action.payload.userID;
    },

    logout: (state) => {
      state.name = "";
      state.googleID = "";
      state.email = "";
      state.imgURL = "";
      state.admin = false;
      state.userID = "";
    },
    
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },

    setUserId: (state, action) => {
      state.userID = action.payload;
    }
  },
});

export const { login, logout, setAdmin, setUserId } = userSlice.actions;

export default userSlice.reducer;

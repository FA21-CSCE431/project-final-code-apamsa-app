import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    userID: "",
    email: "",
    imgURL: "",
    admin: false,
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.userID = action.payload.userID;
      state.email = action.payload.email;
      state.imgURL = action.payload.imgURL;
      state.admin = action.payload.admin;
    },

    logout: (state) => {
      state.name = "";
      state.userID = "";
      state.email = "";
      state.imgURL = "";
      state.admin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

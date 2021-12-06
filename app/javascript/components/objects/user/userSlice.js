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
    prizesWon: 0,
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.googleID = action.payload.googleID;
      state.email = action.payload.email;
      state.imgURL = action.payload.imgURL;
      state.admin = action.payload.admin;
      state.userID = action.payload.userID;
      state.prizesWon = action.payload.prizesWon;
    },

    logout: (state) => {
      state.name = "";
      state.googleID = "";
      state.email = "";
      state.imgURL = "";
      state.admin = false;
      state.userID = "";
      state.prizesWon = 0;
    },

    setAdmin: (state, action) => {
      state.admin = action.payload;
    },

    setUserId: (state, action) => {
      state.userID = action.payload;
    },

    setPrizesWon: (state, action) => {
      state.prizesWon = action.payload;
    }
  },
});

export const { login, logout, setAdmin, setUserId, setPrizesWon } = userSlice.actions;

export default userSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./objects/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

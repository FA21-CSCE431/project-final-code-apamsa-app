import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./objects/user/userSlice";
import eventsReducer from "./objects/event/eventsSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
  },
});

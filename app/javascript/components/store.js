import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./objects/user/userSlice";
import eventsReducer from "./objects/events/eventsSlice"
import blogPostsReducer from "./objects/blogPost/bpSlice"
import commentsReducer from "./objects/comment/commentSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    blog_posts: blogPostsReducer,
    comments: commentsReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    currentComments: [],
    updateCount: 0,
  },
  reducers: {
    setComments: (state, action) => {
      state.currentComments = action.payload;
    },
    incrementCount: (state) => {
      state.updateCount++;
    },
  },
});

export const { setComments, incrementCount } = commentsSlice.actions;

export default commentsSlice.reducer;
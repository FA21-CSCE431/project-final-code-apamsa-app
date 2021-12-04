import { createSlice } from "@reduxjs/toolkit";

export const bpSlice = createSlice({
  name: "blog_posts",
  initialState: {
    currentBps: [],
    updateCount: 0,
  },
  reducers: {
    setBPs: (state, action) => {
      state.currentBps = action.payload;
    },
    incrementCount: (state) => {
      state.updateCount++;
    },
  },
});

export const { setBPs, incrementCount } = bpSlice.actions;

export default bpSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    currentEvents: [],
    updateCount: 0,
  },
  reducers: {
    setEvents: (state, action) => {
      state.currentEvents = action.payload;
    },
    incrementCount: (state) => {
      state.updateCount++;
    },
  },
});

export const { setEvents, incrementCount } = eventsSlice.actions;

export default eventsSlice.reducer;

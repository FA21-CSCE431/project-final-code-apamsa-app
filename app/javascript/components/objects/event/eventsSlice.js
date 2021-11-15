import { createSlice } from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    currentEvents: [],
  },
  reducers: {
    addEvent: (state, action) => {
      state.currentEvents = [...state.currentEvents, action.payload];
    },
  },
});

export const { addEvent } = eventsSlice.actions;

export default eventsSlice.reducer;

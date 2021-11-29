import { createSlice } from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    currentEvents: [],
    allEvents: [],
    filterDate: "",
    updateCount: 0,
    newEventDate: new Date(),
  },
  reducers: {
    setEvents: (state, action) => {
      state.allEvents = action.payload;
      state.currentEvents = action.payload;
    },
    incrementCount: (state) => {
      state.updateCount++;
    },
    setDate: (state, action) => {
      state.filterDate = action.payload;
    },
    filterByDate: (state) => {
      state.currentEvents = state.allEvents.filter(
        (event) => event.attributes.event_date == state.filterDate
      );
    },
    resetFilter: (state) => {
      state.currentEvents = state.allEvents;
    },
    updateNewEventDate: (state, payload) => {
      state.newEventDate = action.payload;
    },
  },
});

export const {
  setEvents,
  incrementCount,
  setDate,
  filterByDate,
  resetFilter,
  updateNewEventDate,
} = eventsSlice.actions;

export default eventsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    currentEvents: [],
    allEvents: [],
    pastEvents: [],
    filterDate: "",
    updateCount: 0,
    newEventDate: "",
    today: "",
  },
  reducers: {
    setEvents: (state, action) => {
      state.allEvents = action.payload;
    },
    incrementCount: (state) => {
      state.updateCount++;
    },
    setDate: (state, action) => {
      state.filterDate = action.payload;
    },
    filterByCurrent: (state) => {
      state.currentEvents = state.allEvents.filter(
        (event) => event.attributes.event_date >= state.today
      )
    },
    filterByDate: (state) => {
      state.currentEvents = state.allEvents.filter(
        (event) => event.attributes.event_date == state.filterDate
      );
    },
    filterByPast: (state) => {
      state.pastEvents = state.allEvents.filter(
        (event) => event.attributes.event_date < state.today 
      );
    },
    resetFilter: (state) => {
      state.currentEvents = state.allEvents;
    },
    updateNewEventDate: (state, action) => {
      state.newEventDate = action.payload;
    },
    updateToday: (state, action) => {
      state.today = action.payload;
    }
  },
});

export const {
  setEvents,
  incrementCount,
  setDate,
  filterByDate,
  resetFilter,
  updateNewEventDate,
  updateToday,
  filterByPast,
  filterByCurrent
} = eventsSlice.actions;

export default eventsSlice.reducer;

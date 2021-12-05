import React, { useState } from "react";
import TabBar from "./tabBar";
import Events from "../EventsPage/Events"
import { Stack, Button } from '@mui/material';
import Calendar from "./calendar";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../objects/events/eventsSlice";

const EventsPage = () => {
  const dispatch = useDispatch();
  const currLen = useSelector((state) => state.events.currentEvents.length);
  const allLen = useSelector((state) => state.events.allEvents.length);

  const handleShowAll = () => {
    dispatch(resetFilter());
  }

  return (
    <div>
      <header>
        <TabBar tabValue={2} />
      </header>
      <Stack spacing={10} direction="row" justifyContent="space-between">
        <Stack direction="column">
          <Calendar />
          {(currLen < allLen) && (<Button variant="text" onClick={handleShowAll}>Show All Events</Button>)}
        </Stack>  
        <Events/>
      </Stack>
    </div>
  );
};

export default EventsPage;

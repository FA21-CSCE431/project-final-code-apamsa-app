import React, { useState } from "react";
import TabBar from "./tabBar";
import Events from "../EventsPage/Events"
import { Stack, Button } from '@mui/material';
import Calendar from "./calendar";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../objects/events/eventsSlice";

const EventsPage = () => {

  return (
    <div>
      <header>
        <TabBar tabValue={2} />
      </header>
      <Stack spacing={10} direction="row" justifyContent="space-between">
        <Calendar />
        <Events/>
      </Stack>
    </div>
  );
};

export default EventsPage;

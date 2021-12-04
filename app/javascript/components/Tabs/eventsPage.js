import React, { useState } from "react";
import TabBar from "./tabBar";
import Events from "../EventsPage/Events"
import Stack from '@mui/material/Stack';
import Calendar from "./calendar";

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

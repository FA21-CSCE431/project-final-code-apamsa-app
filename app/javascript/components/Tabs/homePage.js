import React from "react";
import TabBar from "./tabBar";
import { Stack } from "@mui/material";
import UpcomingEvents from "../HomePage/upcomingEvents";
import Calendar from "./calendar";


const HomePage = () => {

  return (
    <div>
      <header>
        <TabBar tabValue={0} />
      </header>
      
      <Stack spacing={10} direction="row" justifyContent="flex-start">
        <Calendar />
        <UpcomingEvents />
      </Stack>
    </div>
  );
};

export default HomePage;

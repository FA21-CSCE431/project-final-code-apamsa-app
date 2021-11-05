import React, { useState} from "react";
import TabBar from "./tabBar";
import Events from "../Events/Events"
import Stack from '@mui/material/Stack';
import Calendar from "react-calendar"

const EventsPage = () => {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <div>
      <header>
        <TabBar tabValue={2} />
      </header>
      <Stack spacing={20} direction="row">
        <Calendar onChange={onChange} value={value} />
        <Events/>
        <div>
          <p>Place Holder</p>
        </div>
      </Stack>
    </div>
  );
};

export default EventsPage;

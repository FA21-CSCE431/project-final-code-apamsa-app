import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Event from "./Event";
import axios from "axios";
import styled from "styled-components";
import { Stack } from "@mui/material";
import CreateEvent from "./createEvent";
import { setEvents, incrementCount } from "../objects/event/eventsSlice";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  justify-items: center;
  align-content: center;
  width: 30%;
  padding: 20px;
  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`;

const Events = () => {
  const  is_admin = useSelector((state) => state.user.admin);

  // Calendar
  const [dateValue, setdateValue] = useState(new Date());
  const dispatch = useDispatch();

  function onChange(nextValue) {
    setdateValue(nextValue);
  }

  const events = useSelector((state) => state.events.currentEvents);

  const getEvents = () => {
    axios
      .get("api/v1/events.json")
      .then((resp) => {
        dispatch(setEvents(resp.data.data));
      })
      .catch((resp) => console.log(resp));
  };

  const updates = useSelector((state) => state.events.updateCount);

  useEffect(() => {
    getEvents();
  }, [updates]);

  // Events layout
  const grid = events.map((event, index) => {
    const {
      event_name,
      event_date,
      description,
      event_start_time,
      event_end_time,
      slug,
      img_url,
    } = event.attributes;

    const event_id = event.id;

    return (
      <Event
        key={index}
        event_id={event_id}
        event_name={event_name}
        event_date={event_date}
        description={description}
        event_start_time={event_start_time}
        event_end_time={event_end_time}
        slug={slug}
        img_url={img_url}
      />
    );
  });

  return (
    <div style={{ margin: "5px 15px 10px" }}>
      <Stack
        spacing={10}
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        {/* Events */}
        <Grid>
          {is_admin && (
            <CreateEvent />
          )}
          {grid}
        </Grid>
      </Stack>
    </div>
  );
};

export default Events;

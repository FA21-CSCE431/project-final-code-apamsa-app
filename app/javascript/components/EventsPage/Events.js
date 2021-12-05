import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Event from "./Event";
import axios from "axios";
import styled from "styled-components";
import { Button, Stack } from "@mui/material";
import CreateEvent from "./createEvent";
import { 
  setEvents, 
  incrementCount,
  filterByPast,
  filterByCurrent
} from "../objects/events/eventsSlice";

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
  const [show_past, setShowPast] = useState(false);
  const [show_curr, setShowCurr] = useState(false);

  const dispatch = useDispatch();

  const events = useSelector((state) => state.events.allEvents);
  const currEvents = useSelector((state) => state.events.currentEvents);
  const pastEvents = useSelector((state) => state.events.pastEvents);

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

  const handleShowCurrEvents = () => {
    dispatch(filterByCurrent());
    setShowCurr(!show_curr);
  }

  const handleShowPastEvents = () => {
    dispatch(filterByPast());
    setShowPast(!show_past);
  }

  // Events layout
  const grid = currEvents.map((event, index) => {
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

  const pastGrid = pastEvents.map((event, index) => {
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
    <div>
      <Stack
        spacing={10}
        direction="row"
        alignItems="stretch"
      >
        {/* Events */}
        <Grid>
          {is_admin && (
            <CreateEvent />
          )}
          <Button variant="text" onClick={handleShowCurrEvents}> Show Upcoming Events </Button>
          {show_curr && (
            <Fragment>
              {grid}
            </Fragment>
          )}
          <Button variant="text" onClick={handleShowPastEvents}> Show Past Events </Button>
          {show_past && (
            <Fragment>
              {pastGrid}
            </Fragment>
          )}
        </Grid>
      </Stack>
    </div>
  );
};

export default Events;

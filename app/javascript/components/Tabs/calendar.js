import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { Grid, Button, Stack } from "@mui/material";
import {
  setDate,
  filterByDate,
  resetFilter,
  setPastDate,
  fileterByPast,
  updateToday
} from "../objects/events/eventsSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const [value, setValue] = useState(today);
  
  const currLen = useSelector((state) => state.events.currentEvents.length);
  const selectedLen = useSelector((state) => state.events.selectedEvents.length);

  const todayDateFormat =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" + ((today.getDate() < 10) ? "0" : "") + today.getDate();
  dispatch(updateToday(todayDateFormat.toString()));

  const setChosenDate = (newValue) => {
    const formatDate =
      newValue.getFullYear() +
      "-" +
      (newValue.getMonth() + 1) +
      "-" + ((newValue.getDate() < 10) ? "0" : "") + newValue.getDate();
    dispatch(setDate(formatDate.toString()));
    dispatch(filterByDate());
  };

  const handleShowAll = () => {
    dispatch(resetFilter());
    setValue(today);
  }

  return (
    <Stack direction="column">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          onChange={(newValue) => {
            setChosenDate(newValue);
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {(currLen > selectedLen) && (<Button variant="text" onClick={handleShowAll}>Show All Upcoming</Button>)}
    </Stack>
  );
};

export default Calendar;

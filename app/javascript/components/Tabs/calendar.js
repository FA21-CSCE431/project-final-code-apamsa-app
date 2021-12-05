import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { Grid, Button } from "@mui/material";
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

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Calendar;

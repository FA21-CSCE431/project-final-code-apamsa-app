import * as React from "react";
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
} from "../objects/event/eventsSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(new Date());

  const setChosenDate = (newValue) => {
    const formatDate =
      newValue.getFullYear() +
      "-" +
      (newValue.getMonth() + 1) +
      "-" +
      newValue.getDate();
    dispatch(setDate(formatDate.toString()));
    dispatch(filterByDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="portrait"
        openTo="day"
        value={value}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
          setChosenDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default Calendar;

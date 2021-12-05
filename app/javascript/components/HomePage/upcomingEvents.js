import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid'
import { 
  Stack,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  TableBody
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../objects/events/eventsSlice";

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.selectedEvents);

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

  const eventList = events.map( (item, index) => {
    return (
      <TableRow
        key={index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {item.attributes.event_name}
        </TableCell>
        <TableCell>{item.attributes.event_date}</TableCell>
      </TableRow>
    )
  })

  return (
    <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Event Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventList}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

export default UpcomingEvents
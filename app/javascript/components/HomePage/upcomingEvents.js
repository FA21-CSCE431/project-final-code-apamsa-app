import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid'
import { Stack } from "@mui/material";

const UpcomingEvents = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('api/v1/events.json')
    .then( resp => setEvents(resp.data.data))
    .catch( resp => console.log(resp))
  }, [events.length])

  const columns = [
    {
      field: 'event_name',
      header: 'Upcoming Events',
      width: 200
    },
    {
      field: 'event_date',
      header: ' ',
      width: 200
    }
  ];

  const rows = events.map( item => {
    return (
      {
        id: item.id, event_name: item.attributes.event_name, event_date: item.attributes.event_date
      }
    )
  })


  return (
    <div>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnReorder
        />
    </div>
  )
}

export default UpcomingEvents
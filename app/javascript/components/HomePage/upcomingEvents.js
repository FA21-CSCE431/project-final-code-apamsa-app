import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { Stack } from "@mui/material";
import Calendar from 'react-calendar'

const UpcomingEvents = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('api/v1/events.json')
    .then( resp => setEvents(resp.data.data))
    .catch( resp => console.log(resp))
  }, [events.length])

  // const list = events.map( item => {
  //   return (<dt key={item.attributes.event_name}><Link to={"/events/"}>{item.attributes.event_name}{item.attributes.event_date}</Link></dt>)
  // })

  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

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
    <div style={{ margin: "5px 15px 10px" }}>
      <Stack 
        spacing={10} 
        direction="row" 
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        <div style={{ width: "33%" }}>
          <Calendar onChange={onChange} value={value} />
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnReorder
        />
      </Stack>
    </div>
  )
}

export default UpcomingEvents
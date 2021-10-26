import React, { useState, useEffect } from "react";
import TabBar from "./tabBar";
import styled from 'styled-components'
import Event from '../Events/Event'
import axios from "axios";
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'



const HomePage = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('api/v1/events.json')
    .then( resp => setEvents(resp.data.data))
    .catch( resp => console.log(resp))
  }, [events.length])

  // const list = events.map( item => {
  //   return (<dt key={item.attributes.event_name}><Link to={"/events/"}>{item.attributes.event_name}{item.attributes.event_date}</Link></dt>)
  // })

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
      <header>
        <TabBar tabValue={0} />
      </header>
      <br/>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnReorder
      />
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react'
import Event from './Event'
import axios from 'axios'
import styled from 'styled-components'
import { Stack } from '@mui/material'
import CreateEvent from './createEvent'


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
`

const Events = () => {

  // Calendar
  const [dateValue, setdateValue] = useState(new Date());

  function onChange(nextValue) {
    setdateValue(nextValue);
  }

  // Events api
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('api/v1/events.json')
    .then( resp => setEvents(resp.data.data))
    .catch( resp => console.log(resp))
  }, [events.length])

  // Events layout
  const grid = events.map( (event, index) => {
    const { event_name, 
            event_date, 
            description, 
            event_start_time, 
            event_end_time, 
            slug,
            img_url } = event.attributes
    
    return (
      <Event
        key={index}
        event_name={event_name}
        event_date={event_date}
        description={description}
        event_start_time={event_start_time}
        event_end_time={event_end_time} 
        slug={slug} 
        img_url={img_url}
      />
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
        {/* Blog Posts */}
        <Grid>
          <CreateEvent /> {/* Only for ADMIN */}
          {grid}
        </Grid>

      </Stack>
    </div>
  )
}

export default Events
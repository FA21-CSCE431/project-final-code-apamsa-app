import React, { useState, useEffect } from 'react'
import Event from './Event'
import axios from 'axios'
import styled from 'styled-components'

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
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('api/v1/events.json')
    .then( resp => setEvents(resp.data.data))
    .catch( resp => console.log(resp))
  }, [events.length])

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

  // const list = events.map( item => {
  //   return (<li key={item.attributes.event_name}>{item.attributes.event_name}</li>)
  // })

  return (
    <div>
      <h1>Events Page</h1>
      <Grid>{grid}</Grid>
    </div>
  )
}

export default Events
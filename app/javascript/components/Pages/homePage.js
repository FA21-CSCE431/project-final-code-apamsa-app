import React, { useState, useEffect } from "react";
import TabBar from "./tabBar";
import styled from 'styled-components'
import Event from '../Events/Event'
import axios from "axios";
import { BrowserRouter as Router, Link } from 'react-router-dom'


const Grid = styled.div `
display: inline-grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 20px;
justify-items: center;
align-content: center;
border: 1px solid #efefef;
background: #fff;
`

const HomePage = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('api/v1/events.json')
    .then( resp => setEvents(resp.data.data))
    .catch( resp => console.log(resp))
  }, [events.length])

  const list = events.map( item => {
    return (<dt key={item.attributes.event_name}><Link to={"/events/"}>{item.attributes.event_name}{item.attributes.event_date}</Link></dt>)
  })

  return (
    <div>
      <header>
        <TabBar tabValue={0} />
      </header>
      <br/>
      <Grid>
        <dl>
          <dt><h2>Upcoming Events</h2></dt>
          {list}
        </dl>
      </Grid>
    </div>
  );
};

export default HomePage;

import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
`

const EventName = styled.div`
  padding: 20px 0 10px 0;
`
const EventDate = styled.div`
  padding: 20px 0 10px 0;
`

const EventFlyer = styled.div`
  height: 50px;
  img {
    height: 110px;
    width: 85px;
  }
`

const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height:50px;
  a {
    color: #fff;
    background-color: #191d74;
    border-radius: 4px;
    padding: 10px 50px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #191d74;
    text-align: center;
    line-height: 20px;
    min-height: 60px;
    margin: 7px;
    font-weight: 600;
    text-decoration: none;
    width: 100%;
    transition: ease-in-out 0.1s;
    &:hover{
      border-color: #6c72ff;
      background: #6c72ff;
    }
  }
`

const Event = ({ event_name, 
                 event_date, 
                 description, 
                 event_start_time, 
                 event_end_time, 
                 slug, 
                 img_url,
                 ...props }) => {
  return (
    <Card>
      {/* <EventFlyer>
        <img src={img_url} alt={event_name} width="50"/>
      </EventFlyer> */}
      <EventName>
        {event_name}
      </EventName>
      <EventDate>
        {event_date}
      </EventDate>
      <LinkWrapper>
        <Link to={"/rsvps"}>Rsvp</Link>
      </LinkWrapper>
    </Card>
  )
}

export default Event
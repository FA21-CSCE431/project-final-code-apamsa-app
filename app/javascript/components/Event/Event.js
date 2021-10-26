import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Event = (props) => 
{
  const [airline, setAirline] = useState({})
  const [rsvp, setRsvp] = useState({})

  useEffect(() => {
    const slug = props.match.params.slug
    const url = `/api/v1/events/${slug}`

    axios.get(url)
    .then( resp => console.log(resp))
    .catch( resp => console.log(resp))
  }, [])

  return (
    <div className="wrapper">
      <div className="column">
        <div className="header"></div>
      </div>
    </div>
  )
}

export default Event
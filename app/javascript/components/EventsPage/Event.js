import React, { useState } from 'react'
import { Card, CardActions, CardMedia, CardHeader, Button, CardContent, Paper, Typography } from '@mui/material'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import PlaceholdreImage from '../../../assets/images/apamsa.png'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import BeenhereIcon from '@mui/icons-material/Beenhere';

const Event = ({ event_name, 
                 event_date, 
                 description, 
                 event_start_time, 
                 event_end_time, 
                 slug, 
                 img_url,
                 ...props }) => 
{
  var rsvpAlert;

  const [rsvped, setRsvped] = useState(false);

  const handleRsvp = () => {
    setRsvped(true)
  };

  if (rsvped)
  {
    rsvpAlert = (
      <Alert severity='success'>
        <AlertTitle>Successful Rsvp</AlertTitle>
        Your RSVP was successful - <strong>Don't forget to add it to your calendar!</strong>
      </Alert>
    )
  }
  else 
  {
    rsvpAlert = (
      <Button variant='contained' endIcon={<BeenhereIcon />} onClick={handleRsvp}>
        RSVP Here
      </Button> 
    )
  }

  return (
    <Paper>
      <CardMedia
        component='img'
        image={PlaceholdreImage}
        alt='Event flyer 1'
      />
      <CardHeader
        title={event_name}
        subheader={event_date}
      />
      <CardContent>
        <Typography variant='subtitle1'>
          {event_start_time} to {event_end_time}
        </Typography>
        <br />
        <Typography paragraph>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {rsvpAlert}
      </CardActions>
    </Paper>
  )
}

export default Event
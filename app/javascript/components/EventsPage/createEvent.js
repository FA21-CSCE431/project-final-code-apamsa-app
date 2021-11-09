import React, { Fragment, useState } from "react";
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardActions, Collapse, TextField, ToggleButton, Typography, CardHeader, Paper } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(45deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CreateEvent = () => {

  const [expanded, setExpanded] = useState(false);

  const [event, setEvent] = useState({});

  const [value, setValue] = useState(new Date());
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmitPost = () => {

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.post('/api/v1/events', {event})
    .then(resp => {
      setEvent({event_name: '', event_date: '', description: '', event_start_time: '', event_end_time: ''})
    })
    .catch(resp => {})

    setExpanded(false)
  };

  const handleChange = (e) => {

    setEvent(Object.assign({}, event, {[e.target.name]: e.target.value}))

    console.log(event)
  };
  
  const handleCalendarChange = (newValue) => {

    setValue(newValue)

    setEvent(Object.assign(event, event, {['event_date']: value.toISOString()}))
  };

  return (
    <Paper>
      <CardHeader
        title={<Typography variant='h4'>New Event</Typography>}
        action={
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
            <IconButton>
              <AddIcon />
            </IconButton>
          </ExpandMore>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>

        <CardActions>
          <TextField
            id="outlined-textarea"
            label="Title"
            placeholder="Title"
            onChange={handleChange}
            value={event.event_name}
            name="event_name"
            multiline
          />
        </CardActions>
        <CardActions>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date"
              value={value}
              minDate={new Date()}
              onChange={handleCalendarChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </CardActions>

        <CardActions>
          <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              onChange={handleChange}
              value={event.description}
              name="description"

              rows={4}
            />
        </CardActions>

        <CardActions>
          <TextField
            id="outlined-textarea"
            label="Start Time"
            placeholder="hh:mm (a|p)m"
            onChange={handleChange}
            value={event.event_start_time}
            name="event_start_time"

            multiline
          />
          <TextField
            id="outlined-textarea"
            label="End Time"
            placeholder="hh:mm (a|p)m"
            onChange={handleChange}
            value={event.event_end_time}
            name="event_end_time"

            multiline
          />
        </CardActions>

        <CardHeader action={
            <Button variant="contained" onClick={handleSubmitPost}>
              Create Event
            </Button>
          }
        />
      </Collapse>
    </Paper>
  )
}

export default CreateEvent
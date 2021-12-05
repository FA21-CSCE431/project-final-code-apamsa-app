import React, { Fragment, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Collapse,
  TextField,
  ToggleButton,
  Typography,
  CardHeader,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  AlertTitle,
  Alert,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; 
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { setEvents, incrementCount } from "../objects/events/eventsSlice";
import { useDispatch, useSelector } from "react-redux";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(45deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CreateEvent = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const [event, setEvent] = useState({});
  const [successful_post, setSuccessfulPost] = useState(false);
  const [bad_post, setBadPost] = useState(false);

  const [value, setValue] = useState(new Date());

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmitPost = () => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    axios
      .post("/api/v1/events", { event })
      .then((resp) => {
        setEvent({
          event_name: "",
          event_date: "",
          description: "",
          event_start_time: "",
          event_end_time: "",
        });
        setSuccessfulPost(true);
      })
      .catch((resp) => setBadPost(false));
      
    dispatch(incrementCount());
    setExpanded(false);
  };

  const handleChange = (e) => {
    setEvent(Object.assign({}, event, { [e.target.name]: e.target.value }));
  };

  const handleCalendarChange = (newValue) => {
    setValue(newValue);

    setEvent(
      Object.assign(event, event, { ["event_date"]: newValue.toISOString() })
    );
  };

  return (
    <Fragment>
      <Paper sx={{minWidth: 500}}>
        <CardHeader
          title={<Typography variant="h4">New Event</Typography>}
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
              required
            />
          </CardActions>
          <CardActions>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date"
                value={value}
                minDate={new Date("2021-12-1")}
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
              required
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
              required
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
              required
              multiline
            />
          </CardActions>

          <CardHeader
            action={
              <Button variant="contained" onClick={handleSubmitPost}>
                Create Event
              </Button>
            }
          />
        </Collapse>
      </Paper>
      {/* Successful Event */}
      <Dialog
      open={successful_post}
      onClose={() => {
        setSuccessfulPost(false);
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <Alert>Event was successfully edited!</Alert>
      </DialogTitle>
      <DialogActions>
        <IconButton
          onClick={() => {
            setSuccessfulPost(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
    {/* Bad Event */}
    <Dialog
      open={bad_post}
      onClose={() => {
        setBadPost(false);
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <Alert>Uh oh something went wrong with creating the event!</Alert>
      </DialogTitle>
      <DialogActions>
        <IconButton
          onClick={() => {
            setBadPost(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  </Fragment>
  );
};

export default CreateEvent;

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardActions,
  CardMedia,
  CardHeader,
  Button,
  CardContent,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  AlertTitle,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Collapse,
  TextField,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { styled } from "@mui/material/styles";
import PlaceholdreImage from "../../../assets/images/apamsa.png";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create"
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { decrementCount } from "../objects/events/eventsSlice";

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

const Event = ({
  event_id,
  event_name,
  event_date,
  description,
  event_start_time,
  event_end_time,
  slug,
  img_url,
  ...props
}) => {
  const { name, email, user_id, is_admin } = {
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    user_id: useSelector((state) => state.user.userID),
    is_admin: useSelector((state) => state.user.admin),
  };

  const [openConfirmDelete, setOpenConfirmnDelete] = useState(false);
  const [openDeleted, setOpenDeleted] = useState(false);
  const [openRsvp, setOpenRsvp] = useState(false);
  const [rsvp, setRsvp] = useState({});
  const [rsvpArray, setRsvpArray] = useState([]);
  const [showRsvps, setShowRsvps] = useState(false);
  const [openRsvpError, setOpenRsvpError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [successful_post, setSuccessfulPost] = useState(false);
  const [bad_post, setBadPost] = useState(false);
  const [event, setEvent] = useState({});
  const [value, setValue] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    axios
    .get(`/api/v1/events/${slug}`)
    .then( resp => {
      setRsvpArray(resp.data.included);
    })
    .catch(resp => console.log("Error:", resp))
  }, [rsvpArray.length])

  const rsvpList = rsvpArray.map( (item, index) => {
    return (
      <TableRow
        key={index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {item.attributes.name}
        </TableCell>
        <TableCell>{item.attributes.email}</TableCell>
      </TableRow>
    )
  })

  const handleRsvpClick = () => {
    setRsvp(Object.assign(rsvp, rsvp, {
      ["event_name"]: event_name,
      ["event_date"]: event_date,
      ["name"]: name,
      ["email"]: email,
      ["event_id"]: event_id,
      ["user_id"]: user_id,
    }))

    axios
      .post("/api/v1/rsvps", {rsvp})
      .then((resp) => {
        setOpenRsvp(true);
      })
      .catch((resp) => {
        setOpenRsvpError(true);
      });
  };

  const handleSubmitPost = () => {
    axios
      .patch(`/api/v1/events/${slug}`, { event })
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
    setExpanded(false);
  };

  const handleDeleteClick = () => {
    setOpenConfirmnDelete(true);
  };

  const handleConfirmDelete = () => {
    const url = `/api/v1/events/${slug}`;

    axios
      .delete(url)
      .then((resp) => {
        setOpenDeleted(true);
        setOpenConfirmnDelete(false);
        dispatch(decrementCount());
      })
      .catch((resp) => console.log(resp));
  };

  const handleShowRsvps = () => {
    setShowRsvps(!showRsvps);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

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
    <div>
      <Paper sx={{minWidth: 500}}>
        <CardMedia
          component="img"
          image={PlaceholdreImage}
          alt="Event flyer 1"
        />
        <CardHeader 
          title={event_name} 
          subheader={event_date}
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {is_admin && (
                <Fragment>
                  {expanded ? <AddIcon /> : <CreateIcon />}
                </Fragment>
              )}
            </ExpandMore>
          }
        />
        <CardContent>
          <Typography variant="subtitle1">
            {event_start_time} to {event_end_time}
          </Typography>
          <br />
          <Typography paragraph>{description}</Typography>
        </CardContent>
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
                  Submit Edit
                </Button>
              }
            />
        </Collapse>
        <CardActions>
          {name !== "" ? (
            <Fragment>
              {!expanded && (
                <Button
                  variant="contained"
                  endIcon={<BeenhereIcon />}
                  onClick={handleRsvpClick}
                >
                  RSVP Here
                </Button>
              )}
            </Fragment>
          ) : (
            <Typography variant="subtitle2">
              Sign in to rsvp
            </Typography>
          )} 
          {is_admin && !expanded && (
            <Fragment>
              <Button
                variant="contained"
                onClick={handleShowRsvps}
              >
                Show RSVP List
              </Button>
              <IconButton onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </Fragment>
          )}
        </CardActions>
        {is_admin && showRsvps && (
          <CardContent>
            <h4>Total number of Rsvps: {rsvpArray.length}</h4>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader={true}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rsvpList}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
      </Paper>
      {/* Rsvp Error */}
      <Dialog
        open={openRsvpError}
        onClose={() => {
          setOpenRsvpError(false);
        }}
      >
        <DialogTitle>
          <Alert severity="info">
            <AlertTitle>You have already Rsvp'd to this event</AlertTitle>
          </Alert>
        </DialogTitle>
        <DialogActions>
          <IconButton
            onClick={() => {
              setOpenRsvpError(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      {/* Delete? */}
      <Dialog
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmnDelete(false);
        }}
      >
        <DialogTitle>
          {`Are you sure you want to delete ${event_name}`}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmDelete}>
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenConfirmnDelete(false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Success */}
      <Dialog
        open={openDeleted}
        onClose={() => {
          setOpenDeleted(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Alert>{event_name} was successfully deleted!</Alert>
        </DialogTitle>
        <DialogActions>
          <IconButton
            onClick={() => {
              setOpenDeleted(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      {/* RSVP Success */}
      <Dialog
        open={openRsvp}
        onClose={() => {
          setOpenRsvp(false);
        }}
      >
        <DialogTitle>
          <Alert severity="success">
            <AlertTitle>Successful Rsvp</AlertTitle>
            Your RSVP was successful -{" "}
            <strong>Don't forget to add it to your calendar!</strong>
          </Alert>
        </DialogTitle>
        <DialogActions>
          <IconButton
            onClick={() => {
              setOpenRsvp(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
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
        <Alert>Uh oh something went wrong with editing the event!</Alert>
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
    </div>
  );
};

export default Event;

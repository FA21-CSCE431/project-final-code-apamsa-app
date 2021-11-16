import React, { useState } from "react";
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
} from "@mui/material";

import PlaceholdreImage from "../../../assets/images/apamsa.png";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

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
  // const [rsvped, setRsvped] = useState(false);
  const [openConfirmDelete, setOpenConfirmnDelete] = useState(false);
  const [openDeleted, setOpenDeleted] = useState(false);
  const [openRsvp, setOpenRsvp] = useState(false);
  const is_admin = useSelector((state) => state.user.admin);

  const handleRsvpClick = () => {
    setOpenRsvp(true);
    axios
      .post("/api/v1/rsvps", {
        ["event_name"]: event_name,
        ["event_date"]: event_date,
        ["name"]: useSelector((state) => state.user.name),
        ["email"]: useSelector((state) => state.user.email),
        ["event"]: event_id,
      })
      .then((resp) => console.log(resp))
      .catch((resp) => console.log(resp));
  };

  const handleDeleteClick = () => {
    setOpenConfirmnDelete(true);
  };

  const handleConfirmDelete = () => {
    const url = `/api/v1/events/${slug}`;

    axios
      .delete(url)
      .then((resp) => console.log(resp))
      .catch((resp) => console.log(resp));

    setOpenDeleted(true);
    setOpenConfirmnDelete(false);
  };

  return (
    <div>
      <Paper>
        <CardMedia
          component="img"
          image={PlaceholdreImage}
          alt="Event flyer 1"
        />
        <CardHeader title={event_name} subheader={event_date} />
        <CardContent>
          <Typography variant="subtitle1">
            {event_start_time} to {event_end_time}
          </Typography>
          <br />
          <Typography paragraph>{description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            endIcon={<BeenhereIcon />}
            onClick={handleRsvpClick}
          >
            RSVP Here
          </Button>
          {is_admin == true && (
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Paper>

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
    </div>
  );
};

export default Event;

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
  TableContainer
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
  const { name, email, user_id } = {
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    user_id: useSelector((state) => state.user.userID),
  };

  const [openConfirmDelete, setOpenConfirmnDelete] = useState(false);
  const [openDeleted, setOpenDeleted] = useState(false);
  const [openRsvp, setOpenRsvp] = useState(false);
  const is_admin = useSelector((state) => state.user.admin);
  const [rsvp, setRsvp] = useState({});
  const [rsvpArray, setRsvpArray] = useState([]);
  const [showRsvps, setShowRsvps] = useState(false);

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
        console.log(resp);
        setOpenRsvp(true);
      })
      .catch((resp) => console.log(resp));
  };

  const handleDeleteClick = () => {
    setOpenConfirmnDelete(true);
  };

  const handleConfirmDelete = () => {
    console.log("Slug for event", slug);
    const url = `/api/v1/events/${slug}`;

    axios
      .delete(url)
      .then((resp) => {
        console.log(resp);
        setOpenDeleted(true);
        setOpenConfirmnDelete(false);
      })
      .catch((resp) => console.log(resp));
  };

  const handleShowRsvps = () => {
    setShowRsvps(!showRsvps);
  };

  return (
    <div>
        <Paper sx={{minWidth: 500}}>
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
            {is_admin && (
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
    </div>
  );
};

export default Event;

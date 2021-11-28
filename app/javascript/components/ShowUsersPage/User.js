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
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close'
import axios from "axios";

const User = ({
  user_index,
  google_id,
  name,
  email,
  img_url,
  is_admin,
  ...props
}) => {

  const [admin_status, setAdminStatus] = useState(is_admin);
  const [openUpdated, setOpenUpdated] = useState(false);
  const [readySubmit, setReadySubmit] = useState(false);

  const updateAdmin = () => {
    if (is_admin)
    {
      setAdminStatus(false);
    }
    else
    {
      setAdminStatus(true);
    }

    setReadySubmit(true);
  }

  const handleUpdateAdmin = () => {

    const url = `/api/v1/users/${user_id}`;

    axios
      .patch(url, {["is_admin"] : admin_status})
      .then((resp) => console.log(resp))
      .catch((resp) => console.log(resp));

    setOpenUpdated(true);
  };

  return (
    <div>
      <Paper>
        <CardHeader title={name} subheader={email} />
        {is_admin && (
          <Fragment>
            <CardContent>
              <Typography>
                Admin
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                endIcon={<RemoveIcon />}
                onClick={updateAdmin}
              >
                Remove admin
              </Button>
              {/* <Button variant="contained" onClick={handleUpdateAdmin}>
                Submit Changes
              </Button> */}
            </CardActions>
          </Fragment>
        )}
        {!is_admin && (
          <Fragment>
            <CardActions>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={updateAdmin}
              >
                Make {name} admin
              </Button>
            </CardActions>
          </Fragment>
        )}
        {readySubmit && (
          <CardActions>
            <Button variant="contained" onClick={handleUpdateAdmin}>
              Submit Changes
            </Button>
          </CardActions>
        )}
      </Paper>
      <Dialog
        open={openUpdated}
        onClose={() => {
          setOpenUpdated(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Alert>{name} privelege was successfully changed!</Alert>
        </DialogTitle>
        <DialogActions>
          <IconButton
            onClick={() => {
              setOpenUpdated(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default User;

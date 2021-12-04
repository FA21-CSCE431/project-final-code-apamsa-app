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
  Chip,
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
  prizes_won,
  ...props
}) => {

  const [admin_status, setAdminStatus] = useState(is_admin);
  const [openUpdated, setOpenUpdated] = useState(false);
  const [readySubmit, setReadySubmit] = useState(false);
  const [cnt, setCnt] = useState(parseInt(prizes_won));

  const updateAdmin = () => {
    if (is_admin)
    {
      setAdminStatus(false);
    }
    else
    {
      setAdminStatus(true);
    }

    setReadySubmit(!readySubmit);
  }

  console.log(is_admin);

  const handleUpdateAdmin = () => {

    const url = `/api/v1/users/${google_id}`;

    axios
      .patch(url, {["is_admin"] : admin_status, ["prizes_won"]: cnt})
      .then((resp) => setOpenUpdated(true))
      .catch((resp) => console.log(resp));
  };

  return (
    <div>
      <Paper sx={{ minWidth: 500 }}>
        <CardHeader title={name} subheader={email} />
          <CardActions>
            {is_admin ? (
              <Fragment>
                <CardContent>
                  <Typography>
                    Admin
                  </Typography>
                </CardContent>
                <Button
                  variant="text"
                  startIcon={<RemoveIcon />}
                  onClick={updateAdmin}
                  color="error"
                >
                  Remove admin
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <CardContent>
                  <Typography>
                    User
                  </Typography>
                </CardContent>
                <Button
                  variant="text"
                  startIcon={<AddIcon />}
                  onClick={updateAdmin}
                  color="success"
                >
                  Make {name} admin
                </Button>
              </Fragment>
            )}
          </CardActions>
          <CardActions>
            <Button variant="outlined" onClick={() => {
              if (cnt != parseInt(prizes_won))
              {
                setReadySubmit(true);
              }
              else
              {
                setReadySubmit(false);
              }
              setCnt(cnt - 1);
            }}>
            - Number of times won 
            </Button>  
            <CardContent>
              <Chip label={cnt} variant="outlined" />
            </CardContent>
            <Button variant="outlined" onClick={() => {
              if (cnt != parseInt(prizes_won))
              {
                setReadySubmit(true);
              }
              else
              {
                setReadySubmit(false);
              }
              setCnt(cnt + 1);
            }}>
            + Number of times won
            </Button>   
          </CardActions>
        <CardActions>
          <Button variant="contained" onClick={handleUpdateAdmin}>
            Submit Changes
          </Button>
        </CardActions>
      </Paper>
      <Dialog
        open={openUpdated}
        onClose={() => {
          setOpenUpdated(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Alert>{name} was successfully updated!</Alert>
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

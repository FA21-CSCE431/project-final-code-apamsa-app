import { Grid, TextField, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { login } from "../../../app/javascript/components/objects/user/userSlice";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  let currentUserName = "";
  let currentEmail = "";

  const logIn = () => {
    dispatch(
      login({
        userName: currentUserName,
        email: currentEmail,
        admin: false,
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={2}>
        <TextField
          required
          id="outlined"
          label="Username:"
          defaultValue={currentUserName}
          onChange={(value) => (currentUserName = value.target.value)}
        />
        <TextField
          required
          id="outlined"
          label="Email:"
          defaultValue={currentEmail}
          onChange={(value) => (currentEmail = value.target.value)}
        />
        <Button
          component={Link}
          to="/home"
          variant="contained"
          onClick={() => logIn()}
        >
          Login
        </Button>
      </Stack>
    </div>
  );
};

export default LoginPage;

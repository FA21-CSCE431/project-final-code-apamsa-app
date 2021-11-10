import React from "react";
import TabBar from "./tabBar";
import { Button, Card, CardHeader, CardMedia } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../objects/user/userSlice";

const ProfilePage = () => {
  const { name, email, imgURL } = {
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    imgURL: useSelector((state) => state.user.imgURL),
  };
  const dispatch = useDispatch();

  return (
    <div>
      <header>
        <TabBar tabValue={4} />
      </header>
      {name !== "" && (
        <Button variant="contained" onClick={() => dispatch(logout())}>
          Sign Out
        </Button>
      )}
      <Card>
        <CardHeader title={name} subtitle={email} />
        <CardMedia component="img" image={imgURL} alt="avatar url" />
      </Card>
    </div>
  );
};

export default ProfilePage;

import React from "react";
import TabBar from "./tabBar";
import { Button, Card, CardHeader, CardMedia } from "@mui/material";

const ProfilePage = ({profile, ...props}) => {

  console.log('Profile: ', profile)
  const { name, email, img_url } = profile;

  return (
    <div>
      <header>
        <TabBar tabValue={4} />
      </header>
      <Button variant="contained">Sign Out (Not functional)</Button>
      <Card>
        <CardHeader
          title={name}
          subtitle={email}
        />
        <CardMedia
          component='img'
          image={img_url}
          alt='avatar url'
        />
      </Card>
    </div>
  );
};

export default ProfilePage;

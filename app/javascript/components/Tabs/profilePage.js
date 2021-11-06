import React from "react";
import TabBar from "./tabBar";
import { Button } from "@mui/material";

const ProfilePage = () => {
  return (
    <div>
      <header>
        <TabBar tabValue={4} />
      </header>
      <Button variant="contained">Sign Out (Not functional)</Button>
    </div>
  );
};

export default ProfilePage;

import React, { useState } from "react";
import TabBar from "./tabBar";
import Users from "../ShowUsersPage/Users";
import Stack from '@mui/material/Stack';

const ShowUsers = () => {
  return (
    <div>
      <header>
        <TabBar tabValue={5} />
      </header>
      <Stack spacing={20} direction="row" justifyContent="space-evenly">
        <Users/>
      </Stack>
    </div>
  );
};

export default ShowUsers;
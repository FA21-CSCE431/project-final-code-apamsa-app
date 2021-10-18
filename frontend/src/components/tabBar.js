import React from "react";
import { Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

const TabBar = (props) => {
  const tabValue = props.tabValue;

  return (
    <Tabs value={tabValue}>
      <Tab value={0} component={Link} to="/home" label="Home" />
      <Tab value={1} component={Link} to="/blog" label="Blog" />
      <Tab value={2} component={Link} to="/events" label="Events" />
      <Tab value={3} component={Link} to="/about" label="About Us" />
      <Tab value={4} component={Link} to="/profile" label="My Profile" />
    </Tabs>
  );
};

export default TabBar;

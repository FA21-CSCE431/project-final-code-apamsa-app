import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { Fragment } from "react"
import { useSelector } from 'react-redux'

const TabBar = (props) => {
  const tabValue = props.tabValue;

  const is_admin = useSelector((state) => state.user.admin);
  const name = useSelector((state) => state.user.name);

  return (
    <Fragment>
      <Tabs value={tabValue}>
        <Tab value={0} component={Link} to="/" label="Home" />
        <Tab value={1} component={Link} to="/blog" label="Blog" />
        <Tab value={2} component={Link} to="/events" label="Events" />
        <Tab value={3} component={Link} to="/about" label="About Us" />
        {name !== "" && (
          <Tab value={4} component={Link} to="/profile" label="My Profile" />
        )}
        <Tab value={5} component={Link} to="/help" label="Help" />
        {is_admin && (
          <Tab value={6} component={Link} to="/users" label="Users List" />
        )}
      </Tabs>
      <br/>
    </Fragment>
  );
};

export default TabBar;

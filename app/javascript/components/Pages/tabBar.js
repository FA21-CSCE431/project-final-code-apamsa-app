import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Calendar from "react-calendar";
import styled from 'styled-components'


const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-items: center;
  align-content: center;
`

const Header = styled.div`
  color: #191d74;
`

const TabBar = (props) => {
  const tabValue = props.tabValue;
  const [d_val, onChange] = useState(new Date());


  return (
    <Fragment>
      <Header>
        <Tabs value={tabValue}>
          <Tab value={0} component={Link} to="/home" label="Home" />
          <Tab value={1} component={Link} to="/blog" label="Blog" />
          <Tab value={2} component={Link} to="/events" label="Events" />
          <Tab value={3} component={Link} to="/about" label="About Us" />
          <Tab value={4} component={Link} to="/profile" label="My Profile" />
        </Tabs>
        <br/>
        <MainGrid>
          <Calendar onChange={onChange} value={d_val} />
        </MainGrid>
      </Header>
    </Fragment>
  );
};

export default TabBar;

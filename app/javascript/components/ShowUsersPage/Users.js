import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import axios from "axios";
import styled from "styled-components";
import { Stack } from "@mui/material";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  justify-items: center;
  align-content: center;
  width: 30%;
  padding: 20px;
  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`;

const Users = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('api/v1/users.json')
      .then( resp => setUsers(resp.data.data))
      .catch( resp => console.log(resp))
  }, [users.length])

  // Events layout
  const grid = users.map((user, index) => {
    const {
      user_id,
      name,
      email,
      img_url,
      is_admin
    } = user.attributes;

    const user_index = user.id;

    return (
      <User
        key={index}
        user_index={user_index}
        user_id={user_id}
        name={name}
        email={email}
        img_url={img_url}
        is_admin={is_admin}
      />
    );
  });

  return (
    <div style={{ margin: "5px 15px 10px" }}>
      <Stack
        spacing={10}
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        {/* Users */}
        <Grid>
          {grid}
        </Grid>
      </Stack>
    </div>
  );
};

export default Users;

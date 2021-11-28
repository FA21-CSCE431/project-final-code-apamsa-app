import React, { useState, useEffect, Fragment } from 'react';
import { Paper, CardHeader, Avatar, CardContent, Typography } from "@mui/material";
import axios from 'axios';

const Comment = (props) => {

  const [name, setName] = useState("");
  const [avatar_url, setAvatarURL] = useState("");

  console.log("Comment Attributes", props);

  axios
    .get(`api/v1/users/${props.google_id}`)
    .then(resp => {
      setName(resp.data.data.attributes.name);
      setAvatarURL(resp.data.data.attributes.img_url);
    })
    .catch(resp => console.log(resp))

  return (
    <Paper>
      <CardHeader
        title={name}
        subheader={props.created_at}
        avatar={<Avatar src={avatar_url}/>}
      />
      <CardContent>
        <Typography paragraph>
          {props.description}
        </Typography>
      </CardContent>
    </Paper>
  )
}

export default Comment
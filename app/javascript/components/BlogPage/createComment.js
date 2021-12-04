import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField
} from "@mui/material";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import axios from "axios";

const CreateComment = (props) => {
  
  const { google_id, user_id } = {
    google_id: useSelector((state) => state.user.googleID),
    user_id: useSelector((state) => state.user.userID)
  }

  const [comment, setComment] = useState({});

  const handleChange = (e) => {
    e.preventDefault()

    setComment(Object.assign({}, comment, {[e.target.name]: e.target.value}))
  };

  const handleSubmitComment = () => {

    setComment(Object.assign(comment, comment, {
      ["blog_post_id"]: props.blog_post_id, 
      ["user_id"]: user_id,
      ["google_id"]: google_id}))
  
    axios
      .post('/api/v1/comments', comment)
      .then( resp => {
        console.log(resp);
       })
      .catch( resp => console.log(resp))
  };

  return (
    <Fragment>
      <Card>
        <CardContent>
          <TextField
            fullWidth
            size="medium"
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows={4}
            defaultValue="Enter your reply here"
            name="description"
            onChange={handleChange}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" endIcon={<SendSharpIcon />} onClick={handleSubmitComment} size="small">Submit</Button> 
        </CardActions>
      </Card>
    </Fragment>
  )
}

export default CreateComment
import React, { Fragment, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardActions, Collapse, TextField, ToggleButton, Typography, CardHeader } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CreatePost = () => {
  const { name, email, img_url, is_admin, user_id } = {
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    img_url: useSelector((state) => state.user.imgURL),
    is_admin: useSelector((state) => state.user.admin),
    user_id: useSelector((state) => state.user.userID)
  };

  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);
  const [blog_post, setPost] = useState({});
  const [indexUserId, setUserId] = useState(0);

  var commentsDisabled;
  if (selected) 
  {
    commentsDisabled = <CheckBoxIcon />;
  } 
  else 
  {
    commentsDisabled = <CheckBoxOutlineBlankIcon />;
  }
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const url = `/api/v1/users/${user_id}`;
    axios
      .get(url)
      .then( resp => setUserId(resp.data.data.id))
      .catch( resp => console.log(resp))
  })

  const handleSubmitPost = () => {

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    setPost(Object.assign(blog_post, blog_post, {["user_id"]: indexUserId}))

    axios.post('/api/v1/blog_posts', {blog_post})
    .then(resp => {
      setPost({title: '', link: '', description: ''})
    })
    .catch(resp => {})

    setExpanded(false)
  };

  const handleChange = (e) => {
    e.preventDefault()

    setPost(Object.assign({}, blog_post, {[e.target.name]: e.target.value}))
  };

  const handleDisableComments = (e) => {
    setSelected(!selected);

    setPost(Object.assign(blog_post, blog_post, {["canComment"]: selected}))
  };

  return (
    <Card>
      <CardHeader
        action={
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
            <Button variant='contained' endIcon={<CreateIcon />}>
              New Post
            </Button>
          </ExpandMore>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardActions>
          <TextField
            id="outlined-textarea"
            label="Title"
            placeholder="Title"
            onChange={handleChange}
            value={blog_post.title}
            name="title"
            multiline
          />
          <TextField
            id="outlined-textarea"
            label="Link"
            placeholder="Link"
            onChange={handleChange}
            value={blog_post.link}
            name="link"

            multiline
          />
        </CardActions>
        <CardActions>
          <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              onChange={handleChange}
              value={blog_post.description}
              name="description"

              rows={4}
            />
        </CardActions>
        <CardActions>
          <Typography paragraph>
            Disable comments?  
          </Typography>
          <ToggleButton
            onChange={handleDisableComments}
            name="canComment"
            selected={selected}
          >
            {commentsDisabled}
          </ToggleButton>
        </CardActions>
        <CardHeader action={
            <Button variant="contained" onClick={handleSubmitPost}>
              Post
            </Button>
          }
        />
      </Collapse>
    </Card>
  )
}

export default CreatePost
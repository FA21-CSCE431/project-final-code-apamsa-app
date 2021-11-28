import React, { Fragment, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { 
  Button, 
  Card, 
  CardActions, 
  CardHeader, 
  Typography, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogActions, 
  Alert, 
  Collapse, 
  TextField, 
  ToggleButton,  
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from "@mui/icons-material/Close"
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
  const { name, email, img_url, is_admin, google_id } = {
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    img_url: useSelector((state) => state.user.imgURL),
    is_admin: useSelector((state) => state.user.admin),
    google_id: useSelector((state) => state.user.googleID)
  }; 

  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);
  const [blog_post, setPost] = useState({});
  const [user_id, setUserID] = useState(0);
  const [successful_post, setSuccessfulPost] = useState(false);
  const [bad_post, setBadPost] = useState(false);

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
    const url = `/api/v1/users/${google_id}`;
    axios
      .get(url)
      .then( resp => {
        setUserID(resp.data.data.id);
      })
      .catch( resp => {
        console.log("Get user error: ", resp);
      })
  })

  const handleSubmitPost = () => {

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    setPost(Object.assign(blog_post, blog_post, {["user_id"]: user_id, ["google_id"]: google_id}))

    axios.post('/api/v1/blog_posts', {blog_post})
    .then(resp => {
      setPost({title: '', link: '', description: ''})
      setSelected(false);
      setSuccessfulPost(true);
      setExpanded(false);
      console.log("Blog Post: ", resp);
    })
    .catch(resp => {
      setBadPost(true);
      console.log("Error: ", resp);
    })
  };

  const handleChange = (e) => {
    e.preventDefault()

    setPost(Object.assign({}, blog_post, {[e.target.name]: e.target.value}))
  };

  const handleDisableComments = () => {
    setSelected(!selected);

    setPost(Object.assign(blog_post, blog_post, {["canComment"]: selected}))
    console.log("Disabled:", selected);
  };

  return (
    <Fragment>
      <Card sx={{minWidth: 500}}>
        <CardHeader
          action={
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
              <Button variant="contained">
                New Post <CreateIcon />
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
                id="outlined-textarea"
                label="Summary"
                placeholder="Summary"
                onChange={handleChange}
                value={blog_post.synopsis}
                name="synopsis"

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
              value={0}
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
      {/* Successful Post */}
      <Dialog
        open={successful_post}
        onClose={() => {
          setSuccessfulPost(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Alert>Post was successfully created!</Alert>
        </DialogTitle>
        <DialogActions>
          <IconButton
            onClick={() => {
              setSuccessfulPost(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      {/* Bad Post */}
      <Dialog
        open={bad_post}
        onClose={() => {
          setBadPost(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Alert>Uh oh something went wrong with creating the post!</Alert>
        </DialogTitle>
        <DialogActions>
          <IconButton
            onClick={() => {
              setBadPost(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default CreatePost
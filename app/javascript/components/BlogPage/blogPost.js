import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled as style } from "@mui/material/styles";
import {
  Button,
  CardActions,
  CardHeader,
  CardContent,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Alert,
  Avatar,
  Collapse,
  ToggleButton,
  TextField,
  Stack,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add"
import axios from "axios";
import CreateComment from "./createComment";
import Comments from "./showComments";
import { setComments, incrementCount } from "../objects/comment/commentSlice";

const ExpandMore = style((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(45deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BlogPost = ({
  title,
  description,
  link,
  canComment,
  slug,
  google_id,
  synopsis,
  blog_post_id,
  ...props
}) => {
  const [openConfirmDelete, setOpenConfirmnDelete] = useState(false);
  const [openDeleted, setOpenDeleted] = useState(false);
  const [avatar_url, setAvatarUrl] = useState("");
  const [user_name, setUserName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);
  const [blog_post, setPost] = useState({});
  const [successful_post, setSuccessfulPost] = useState(false);
  const [bad_post, setBadPost] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const is_admin = useSelector((state) => state.user.admin);
  const user_id = useSelector((state) => state.user.userID);
  const name = useSelector((state) => state.user.name);

  if (user_name == "") {
    axios
      .get(`api/v1/users/${google_id}`)
      .then((resp) => {
        setUserName(resp.data.data.attributes.name);
        setAvatarUrl(resp.data.data.attributes.img_url);
      })
      .catch((resp) => console.log(resp));
  }

  var commentsDisabled;
  if (selected) {
    commentsDisabled = <CheckBoxIcon />;
  } else {
    commentsDisabled = <CheckBoxOutlineBlankIcon />;
  }

  const handleDeleteClick = () => {
    setOpenConfirmnDelete(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`/api/v1/blog_posts/${slug}`)
      .catch((resp) => console.log(resp));

    setOpenDeleted(true);
    setOpenConfirmnDelete(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (e) => {
    e.preventDefault();

    setPost(Object.assign({}, blog_post, { [e.target.name]: e.target.value }));
  };

  const handleDisableComments = () => {
    setSelected(!selected);

    setPost(Object.assign(blog_post, blog_post, { ["canComment"]: selected }));
  };

  const handleSubmitPost = () => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    setPost(
      Object.assign(blog_post, blog_post, {
        ["user_id"]: user_id,
        ["google_id"]: google_id,
      })
    );

    axios
      .patch(`/api/v1/blog_posts/${slug}`, { blog_post })
      .then((resp) => {
        setPost({ title: "", link: "", description: "" });
        setSelected(false);
        setSuccessfulPost(true);
        setExpanded(false);
      })
      .catch((resp) => {
        setBadPost(true);
      });
  };

  return (
    <div>
      <Paper
        sx={{
          minWidth: 500,
        }}
      >
        <CardHeader
          title={title}
          subheader={user_name}
          action={
            <Button
              variant="text"
              onClick={() => {
                setOpenBlog(true);
              }}
            >
              {" "}
              Show More{" "}
            </Button>
          }
        />
        <CardContent>
          <Typography variant="subtitle1">Summary: {synopsis}</Typography>
        </CardContent>
      </Paper>
      {/* Successful Post */}
      <Dialog
        open={successful_post}
        onClose={() => {
          setSuccessfulPost(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Alert>Post was successfully edited!</Alert>
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
          <Alert>Uh oh something went wrong with editing the post!</Alert>
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
      <Dialog
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmnDelete(false);
        }}
      >
        <DialogTitle>{`Are you sure you want to delete ${title}`}</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmDelete}>
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenConfirmnDelete(false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleted}
        onClose={() => {
          setOpenDeleted(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Alert>{title} was successfully deleted!</Alert>
        </DialogTitle>
        <DialogActions>
          <IconButton
            onClick={() => {
              setOpenDeleted(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      {/* Showing Post in dialog box */}
      <Dialog
        scroll="paper"
        fullWidth={true}
        maxWidth="xl"
        open={openBlog}
        onClose={() => {
          setOpenBlog(false);
        }}
      >
        <DialogActions>
          <IconButton
            onClick={() => {
              setOpenBlog(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogTitle id="alert-dialog-title">
          <Paper
            sx={{
              minWidth: 500,
            }}
          >
            <CardHeader
              title={title}
              avatar={<Avatar src={avatar_url} />}
              subheader={user_name}
              action={
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {is_admin && (
                  <Fragment>
                    {expanded ? <AddIcon /> : <CreateIcon />}
                  </Fragment>
                )}
              </ExpandMore>
              }
            />
            <CardContent>
              <Typography variant="subtitle1">{synopsis}</Typography>
              <Typography paragraph>{description}</Typography>
            </CardContent>
            <CardActions>
              {link != null && (
                <IconButton aria-label="Link to" href={link}>
                  <LinkIcon />
                </IconButton>
              )}
              {is_admin == true && (
                <Fragment>
                  <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon />
                  </IconButton>
                </Fragment>
              )}
            </CardActions>
            {/* Expand To Edit Post */}
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
                <Typography paragraph>Disable comments?</Typography>
                <ToggleButton
                  onChange={handleDisableComments}
                  name="canComment"
                  selected={selected}
                  value={0}
                >
                  {commentsDisabled}
                </ToggleButton>
              </CardActions>
              <CardHeader
                action={
                  <Button variant="contained" onClick={handleSubmitPost}>
                    Post
                  </Button>
                }
              />
            </Collapse>
            {canComment ? (
              <Fragment>
                <Stack spacing={5} direction="column">
                  {name !== "" ? (
                    <Fragment>
                      <CreateComment blog_post_id={blog_post_id} />
                      <Comments slug={slug} id={blog_post_id} />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Typography variant="subtitle2">
                        Sign in to comment
                      </Typography>
                      <Comments slug={slug} id={blog_post_id} />
                    </Fragment>
                  )}
                </Stack>
              </Fragment>
            ) : (
              <Fragment>
                <CardContent>
                  <Typography paragraph color="text.secondary">
                    Comments disabled for this post
                  </Typography>
                </CardContent>
              </Fragment>
            )}
          </Paper>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default BlogPost;

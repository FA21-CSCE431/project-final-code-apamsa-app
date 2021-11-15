import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import {  CardActions, CardHeader, CardContent, 
  Paper, Typography, IconButton, Dialog, 
  DialogTitle, DialogActions,
  AlertTitle, Alert }  from "@mui/material"
import LinkIcon from '@mui/icons-material/Link';
import SendSharpIcon from "@mui/icons-material/SendSharp"
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import axios from "axios";


const BlogPost = ({title, description, link, canComment, slug, ...props}) => {

  const [openConfirmDelete, setOpenConfirmnDelete] = useState(false);
  const [openDeleted, setOpenDeleted] = useState(false);
  const is_admin = useSelector((state) => state.user.admin);

  const handleDeleteClick = () => {
    setOpenConfirmnDelete(true)
  };


  const handleConfirmDelete = () => {
    const url = `/api/v1/blog_posts/${slug}`

    axios.delete(url)
    .then( resp => console.log(resp) )
    .catch( resp => console.log(resp) )

    setOpenDeleted(true)
    setOpenConfirmnDelete(false)
  };

  var commentComponent;
  if (canComment)
  {
    commentComponent = (
      <Fragment>
        <CardContent>
          <TextField
            fullWidth
            size="medium"
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows={4}
            defaultValue="Enter your reply here"
            disabled={!canComment}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" endIcon={<SendSharpIcon />} size="small">Submit</Button> 
        </CardActions>
      </Fragment>
    )
  }
  else
  {
    commentComponent = ( 
      <Fragment>
        <CardContent>
          <Typography paragraph color='text.secondary'>
            Comments disabled for this post
          </Typography>
        </CardContent>
      </Fragment>
    )
  }

  return (
    <div>
      <Paper>
        <CardHeader 
          title={title}
        />
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="Link to" href={link}>
            <LinkIcon />
          </IconButton>
          {is_admin == true && (
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon /> 
            </IconButton>
          )}
        </CardActions>
        {commentComponent}
      </Paper>

      <Dialog
        open={openConfirmDelete}
        onClose={() => {setOpenConfirmnDelete(false)}}
      >
        <DialogTitle>
          {`Are you sure you want to delete ${title}`}
        </DialogTitle>
        <DialogActions>
          <Button variant='contained' onClick={handleConfirmDelete}>
            Yes
          </Button>
          <Button variant='contained' onClick={() => {setOpenConfirmnDelete(false)}}>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleted}
        onClose={() => {setOpenDeleted(false)}}
      >
        <DialogTitle id='alert-dialog-title'>
          <Alert>
            {title} was successfully deleted! 
          </Alert>
        </DialogTitle>
        <DialogActions>
          <IconButton onClick={() => {setOpenDeleted(false)}}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>      
    </div>
  )
} 

export default BlogPost
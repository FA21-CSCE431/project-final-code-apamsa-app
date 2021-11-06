import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
// import { SendIcon } from '@mui/icons-material';
import { Card, CardHeader, CardContent, CardActions, Typography, IconButton } from "@mui/material"
import LinkIcon from '@mui/icons-material/Link';
import SendSharpIcon from "@mui/icons-material/SendSharp"

const BlogPost = ({title, description, link, canComment, ...props}) => {

  return (
    <Card>
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
      </CardActions>
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
    </Card>
  )
} 

export default BlogPost
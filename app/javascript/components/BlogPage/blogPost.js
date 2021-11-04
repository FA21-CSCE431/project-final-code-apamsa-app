import React, { useState } from "react";
import styled from 'styled-components'
import { TextField, Button, Stack } from "@mui/material";
import { SendIcon } from '@mui/icons-material';

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
`

const BlogPost = ({title, description, link, canComment, ...props}) => {

  return (
    <Card>
      <body>{description}</body>
      <Stack spacing={4} direction="column">
          <h3>{title}</h3>
          <h5>{link}</h5>
          <p>{description}</p>
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
          <Button variant="contained" endIcon={<SendIcon />} size="small">Submit</Button> 
          {/* <Button variant="contained" onClick={() => setDisable(false)}>Enable Commenting</Button>
          <Button variant="contained" onClick={() => setDisable(true)}>Disable Commenting</Button> */}
        </Stack>
    </Card>
  )
} 

export default BlogPost
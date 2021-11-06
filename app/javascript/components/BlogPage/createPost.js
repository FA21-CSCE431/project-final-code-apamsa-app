import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardActions, Collapse, TextField, ToggleButton, Typography, CardHeader } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


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

  const [expanded, setExpanded] = useState(false);

  const [selected, setSelected] = useState(false);

  var commentsDisabled;
  if (selected) {
    commentsDisabled = <CheckBoxIcon />;
  } else {
    commentsDisabled = <CheckBoxOutlineBlankIcon />;
  }
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        title="New Post"
        action={
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
            <IconButton>
              <CreateIcon />
            </IconButton>
          </ExpandMore>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardActions>
          <TextField
            id="outlined-textarea"
            label="Title"
            placeholder="Title"
            multiline
          />
          <TextField
            id="outlined-textarea"
            label="Link"
            placeholder="Link"
            multiline
          />
        </CardActions>
        <CardActions>
          <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
            />
        </CardActions>
        <CardActions>
          <Typography paragraph>
            Disable comments?  
          </Typography>
          <ToggleButton
            value="check"
            onChange={() => {
              setSelected(!selected);
            }}
          >
            {commentsDisabled}
          </ToggleButton>
        </CardActions>
      </Collapse>
    </Card>
  )
}

export default CreatePost
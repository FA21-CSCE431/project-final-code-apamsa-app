import React, { useState } from "react";
import TabBar from "./tabBar";
import { TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import Calendar from "react-calendar"
import { Button } from "@mui/material";

const BlogPage = () => {
  /* Calendar */
  const [dateValue, setDateValue] = useState(new Date());

  function onChange(nextValue) {
    setDateValue(nextValue);
  }

  const [disable, setDisable] = useState(false);

  return (
    <div>
      <header>
        <TabBar tabValue={1} />
      </header>
      <Stack spacing={20} direction="row">
        <Calendar onChange={onChange} value={dateValue} />
        <Stack spacing={4} direction="column">
          <h3>Blog Post 1</h3>
          <p>This is a samplie blog post. Here you can post information about what is going on in the world of health related to Asian-Pacific-Americans</p>
          <TextField
            fullWidth
            size="medium"
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows={4}
            defaultValue="Enter post here"
            disabled={disable}
          />
          <Button variant="contained" disable={!disable} onClick={() => setDisable(false)}>Enable Commenting</Button>
          <Button variant="contained" disable={disable} onClick={() => setDisable(true)}>Disable Commenting</Button>
        </Stack>
        <div>
          <p>Place Holder</p>
        </div>
      </Stack>
    </div>
  );
};

export default BlogPage;

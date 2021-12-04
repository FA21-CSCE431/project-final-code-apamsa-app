import React, { useState } from "react";
import TabBar from "./tabBar";
import { Stack } from "@mui/material";
import BlogPosts from "../BlogPage/showBlogPosts";
import Calendar from "./calendar";

const BlogPage = () => {
  return (
    <div>
      <header>
        <TabBar tabValue={1} />
      </header>
      <Stack spacing={10} direction="row" justifyContent="space-between">
        <Calendar />
        <BlogPosts />
      </Stack>
    </div>
  );
};

export default BlogPage;

import React, { useState } from "react";
import TabBar from "./tabBar";
import BlogPosts from "../BlogPage/blogPosts";

const BlogPage = () => {

  return (
    <div>
      <header>
        <TabBar tabValue={1} />
      </header>
      
      <BlogPosts />
    </div>
  );
};

export default BlogPage;

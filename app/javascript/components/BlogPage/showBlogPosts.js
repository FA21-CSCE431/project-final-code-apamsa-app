import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Button, Card, CardActions } from "@mui/material";
import axios from 'axios'
import styled from 'styled-components'
import BlogPost from "./blogPost";
import CreatePost from "./createPost";
import { setBPs, incrementCount } from "../objects/blogPost/bpSlice";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  justify-items: center;
  align-content: center;
  width: 40%;
  padding: 20px;
  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`

const BlogPosts = () => {

  /* Posts */
  // const [blogPosts, setPost] = useState([]);
  const is_admin = useSelector((state) => state.user.admin);

  const dispatch = useDispatch();

  const blog_posts = useSelector((state) => state.blog_posts.currentBps);

  const getBPs = () => {
    axios
      .get("api/v1/blog_posts.json")
      .then((resp) => {
        dispatch(setBPs(resp.data.data));
      })
      .catch((resp) => console.log(resp));
  };

  const updates = useSelector((state) => state.blog_posts.updateCount);

  useEffect(() => {
    getBPs();
  }, [updates]);

  // useEffect(() => {
  //   axios
  //     .get('api/v1/blog_posts.json')
  //     .then( resp => {
  //       setPost(resp.data.data);
  //     })
  //     .catch( resp => console.log(resp))
  // }, [blogPosts.length])

  const grid = blog_posts.map( (blogPost, index) => {
    const { canComment,
            description,
            link,
            title,
            slug,
            google_id, 
            synopsis } = blogPost.attributes
            
    const blog_post_id = blogPost.id;
        
    return (
      <BlogPost
        key={index}
        title={title}
        description={description}
        link={link} 
        canComment={canComment}
        slug={slug}
        google_id={google_id}
        synopsis={synopsis}
        blog_post_id={blog_post_id}
      />
    )
  })

  return (
    <div>
        {/* Blog Posts */}
        <Grid>
          {is_admin && (
            <CreatePost />
          )}
          {grid}
        </Grid>
    </div>
  )
}

export default BlogPosts
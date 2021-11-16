import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Button, Card, CardActions } from "@mui/material";
import Calendar from "react-calendar"
import axios from 'axios'
import styled from 'styled-components'
import BlogPost from "./blogPost";
import CreatePost from "./createPost"

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

  /* Calendar */
  const [dateValue, setDateValue] = useState(new Date());

  function onChange(nextValue) {
    setDateValue(nextValue);
  }

  /* Posts */
  const [blogPosts, setPost] = useState([]);
  const is_admin = useSelector((state) => state.user.admin);

  useEffect(() => {
    axios
      .get('api/v1/blog_posts.json')
      .then( resp => setPost(resp.data.data))
      .catch( resp => console.log(resp))
  }, [blogPosts.length])

  const grid = blogPosts.map( (blogPost, index) => {
    const { canComment,
            description,
            link,
            title,
            slug } = blogPost.attributes
    
    return (
      <BlogPost
        key={index}
        title={title}
        description={description}
        link={link} 
        canComment={canComment}
        slug={slug}
      />
    )
  })

  return (
    <div style={{ margin: "5px 15px 10px" }}>
      <Stack 
        spacing={10} 
        direction="row" 
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        
        {/* Calendar */}
        <div style={{ width: "33%" }}>
          <Calendar onChange={onChange} value={dateValue} />
        </div>


        {/* Blog Posts */}
        <Grid>
          {is_admin && (
            <CreatePost />
          )}
          {grid}
        </Grid>

      </Stack>
    </div>
  )
}

export default BlogPosts
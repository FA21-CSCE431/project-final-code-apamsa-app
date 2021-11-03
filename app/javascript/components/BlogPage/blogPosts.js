import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import Calendar from "react-calendar"
import axios from 'axios'
import styled from 'styled-components'
import BlogPost from "./blogPost";

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

  /* Comments */
  const [disable, setDisable] = useState(false);

  /* Posts */
  const [blogPosts, setPost] = useState([])
  // const [rsvp, setRsvp] = useState({})

  useEffect(() => {
    axios.get('api/v1/blog_posts.json')
    .then( resp => setPost(resp.data.data))
    // .then( resp => console.log(resp))
    .catch( resp => console.log(resp))
  }, [blogPosts.length])

  const grid = blogPosts.map( (blogPost, index) => {
    const { canComment,
            description,
            link,
            title } = blogPost.attributes
    
    return (
      <BlogPost
        key={index}
        title={title}
        description={description}
        link={link} 
        canComment={canComment}
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
        {/* Calendar End */}

        {/* Blog Posts */}
        <Grid>{grid}</Grid>
        {/* Blog Posts End */}

      </Stack>
    </div>
  )
}

export default BlogPosts
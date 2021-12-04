import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./comment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setComments, incrementCounter } from "../objects/comment/commentSlice";
import { Stack } from "@mui/material";

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
`;

const Comments = (props) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) =>
    state.comments.currentComments.filter(
      (comment) => comment.attributes.blog_post_id == props.id
    )
  );

  const getComments = () => {
    console.log("Slug:", props.slug);

    axios
      .get(`/api/v1/comments`)
      .then((resp) => {
        console.log("Commens in axios:", resp.data.data);
        dispatch(setComments(resp.data.data));
      })
      .catch((resp) => console.log(resp));
  };

  const updates = useSelector((state) => state.comments.updateCount);

  useEffect(() => {
    getComments();
  }, [updates]);

  console.log("Comments array:", comments);

  const commentList = comments.map((item, index) => {
    const {
      blog_post_id,
      created_at,
      description,
      google_id,
      updated_at,
      user_id,
    } = item.attributes;

    return (
      <Comment
        key={index}
        created_at={created_at}
        description={description}
        google_id={google_id}
      />
    );
  });

  return (
    <Stack spacing={1} direction="column">
      {commentList}
    </Stack>
  );
};

export default Comments;

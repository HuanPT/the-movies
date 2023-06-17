import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Divider } from "antd";
import { getCommentsById, postCommentById } from "@/lib/comments";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   getCommentsById(id).then((data) => setComments(data.data));
  // }, []);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const data = await getCommentsById(id);
    setComments(data);
  };

  console.log(comments);
  const handleCommentSubmit = async (newComment) => {
    setComments([...comments, newComment]);
    await postCommentById(newComment, id);
  };

  return (
    <div>
      <CommentList comments={comments} />
      <Divider style={{ margin: 0 }} />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default Comments;

import React, { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Divider } from "antd";

const Comments = () => {
  const [comments, setComments] = useState([]);

  console.log(comments);
  const handleCommentSubmit = (newComment) => {
    console.log(comments);
    setComments([...comments, newComment]);
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

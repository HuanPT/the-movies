import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Divider } from "antd";
import {
  editCommentById,
  getCommentsById,
  postCommentById,
  updateCommentById,
} from "@/lib/comments";

export default function Comments({ id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const data = await getCommentsById(id);
    setComments(data);
  };

  const handleCommentSubmit = async (newComment) => {
    setComments([...comments, newComment]);
    await postCommentById(newComment, id);
  };

  const handleCommentEdit = (editComment) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === editComment.id) {
        return editComment;
      }
      return comment;
    });
    setComments(updatedComments);
    updateCommentById(id, updatedComments);
  };

  const handleCommentDelete = (deleteCommentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== deleteCommentId
    );
    setComments(updatedComments);
    updateCommentById(id, updatedComments);
  };

  console.log(comments);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <CommentList
        comments={comments}
        onCommentEdit={handleCommentEdit}
        onDeleteComment={handleCommentDelete}
      />
      <Divider style={{ margin: 0 }} />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
  );
}

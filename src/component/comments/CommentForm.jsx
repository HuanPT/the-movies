import React, { useMemo, useState } from "react";
import { Form, Input, Button } from "antd";
import { useAuthContext } from "@/context/Auth.context";

const { TextArea } = Input;

const CommentForm = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState("");

  const { user } = useAuthContext();

  const name = useMemo(() => user?.displayName, [user]);

  const handleSubmit = () => {
    if (comment !== "") {
      const newComment = {
        name,
        comment,
        timestamp: new Date().toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      };

      onCommentSubmit(newComment);
      setComment("");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item style={{ marginBottom: 4 }}>
        <TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={{ borderRadius: 0 }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;

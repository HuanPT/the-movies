import React, { useMemo, useState } from "react";
import { Form, Input, Button } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import { nanoid } from "nanoid";

const { TextArea } = Input;

const CommentForm = ({ onCommentSubmit }) => {
  const [overview, setOverview] = useState("");

  const { user } = useAuthContext();

  const username = useMemo(() => user?.displayName, [user]);
  const userId = useMemo(() => user?.uid, [user]);
  const id = nanoid();

  const timestamp = new Date().toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const handleSubmit = () => {
    if (overview !== "") {
      const newOverview = {
        id,
        userId,
        username,
        overview,
        timestamp,
      };

      onCommentSubmit(newOverview);
      setOverview("");
    }
  };

  return (
    <Form
      layout="inline"
      onFinish={handleSubmit}
      style={{ alignItems: "center" }}
    >
      <Form.Item style={{ flex: 1 }}>
        <TextArea
          rows={4}
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
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

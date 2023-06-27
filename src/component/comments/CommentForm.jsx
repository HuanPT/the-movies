import React, { useMemo, useState } from "react";
import { Form, Input, Button } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import { nanoid } from "nanoid";
import { FaTelegramPlane } from "react-icons/fa";
import styles from "@/styles/comment/CommentList.module.css";

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
      style={{ alignItems: "center", position: "relative" }}
    >
      <Form.Item style={{ flex: 1, margin: 0 }}>
        <TextArea
          value={overview}
          placeholder="Bình luận..."
          onChange={(e) => setOverview(e.target.value)}
          required
          style={{ borderRadius: 0, paddingRight: 44, minHeight: 44 }}
          autoSize
        />
      </Form.Item>
      <Form.Item style={{ position: "absolute", right: 6, marginInlineEnd: 0 }}>
        <Button
          htmlType="submit"
          type={"text"}
          size="middle"
          className={styles.btnSubmit}
          icon={<FaTelegramPlane size={26} />}
          disabled={overview !== "" ? false : true}
        />
      </Form.Item>
    </Form>
  );
};

export default CommentForm;

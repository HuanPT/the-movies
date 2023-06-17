import React, { useEffect, useMemo, useState } from "react";
import { List } from "antd";
import { FaComments } from "react-icons/fa";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import { selectComment } from "@/stores/comment.slice";
import { getCommentsById } from "@/lib/comments";
import { useAuthContext } from "@/context/Auth.context";
import styles from "@/styles/comment/CommentList.module.css";

const CommentList = ({ comments }) => {
  const { user } = useAuthContext();
  const userId = useMemo(() => user?.uid, [user]);

  return (
    <div>
      <List
        header={
          <h2 className={styles.title}>
            <FaComments /> Bình luận
          </h2>
        }
        className={styles.list}
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item
            key={comment.id}
            style={{ justifyContent: userId == comment.userId && "right" }}
          >
            <div
              style={{
                border: userId == comment.userId && "1px solid #71beff",
                background: userId == comment.userId && "#d8edff",
              }}
              className={styles.list__item}
            >
              <p>
                <strong>{comment.username}</strong>
              </p>
              <p
                // style={{ paddingInline: 6, overflowWrap: "anywhere" }}
                className={styles.overview}
              >
                {comment.overview}
              </p>
              <p className={styles.timestamp}>{comment.timestamp}</p>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentList;

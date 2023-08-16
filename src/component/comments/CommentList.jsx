import React, { useMemo, useState } from "react";
import { List } from "antd";
import { FaComments } from "react-icons/fa";
import { useAuthContext } from "@/context/Auth.context";
import styles from "@/styles/comment/CommentList.module.css";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, onCommentEdit, onDeleteComment }) => {
  const { user } = useAuthContext();

  const [editId, setEditId] = useState(null);
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
          <List.Item key={comment.id}>
            <CommentItem
              comment={comment}
              userId={userId}
              styles={styles}
              editComment={onCommentEdit}
              deleteComment={onDeleteComment}
              editId={editId}
              setEditId={setEditId}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentList;

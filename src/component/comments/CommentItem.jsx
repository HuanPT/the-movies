import { Button, Input, Popconfirm } from "antd";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CommentItem({
  comment,
  userId,
  styles,
  editComment,
  deleteComment,
}) {
  const [editId, setEditId] = useState(null);
  const [overview, setOverview] = useState(comment.overview);

  const handleEdit = () => {
    setEditId(comment.id);
  };

  const handleDoneEdit = () => {
    if (overview.trim() !== "" && overview.trim() !== comment.overview) {
      const timestamp =
        "Chỉnh sửa: " +
        new Date().toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      const newComment = { ...comment, overview, timestamp };
      editComment(newComment);
      setEditId(null);
    } else setEditId(null);
  };

  const confirm = () => {
    deleteComment(comment.id);
  };

  return (
    <>
      {editId === comment.id ? (
        <div style={{ flex: 1, position: "relative" }}>
          <Input
            defaultValue={overview}
            onChange={(e) => setOverview(e.target.value)}
            style={{ minHeight: 40, paddingInlineEnd: 76 }}
          />
          <Button
            style={{ position: "absolute", right: 4, top: 4 }}
            onClick={handleDoneEdit}
          >
            Xong
          </Button>
        </div>
      ) : (
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
            {overview}
          </p>
          <p className={styles.timestamp}>{comment.timestamp}</p>
          {userId === comment.userId && (
            <div className={styles.btnMore}>
              <span onClick={handleEdit}>
                <FaEdit title="Sửa" />
              </span>
              <span>
                <Popconfirm
                  placement="topRight"
                  title={"Xóa bình luận"}
                  description={"Bạn có chắc xóa bình luận này?"}
                  onConfirm={confirm}
                  okText="Có"
                  cancelText="Không"
                >
                  <FaTrash title="Xóa" />
                </Popconfirm>
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

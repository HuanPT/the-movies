import React, { useEffect, useState } from "react";
import { List } from "antd";
import { FaComments } from "react-icons/fa";
import Comments from "./Comments";

const CommentList = ({ comments }) => {
  return (
    <div
      style={{
        maxHeight: 400,
        overflow: "auto",
      }}
    >
      <List
        header={
          <h2 style={{ marginLeft: 12 }}>
            <FaComments /> Bình luận
          </h2>
        }
        style={{ background: "#fff", paddingInline: 12 }}
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item key={comment.timestamp}>
            <div>
              <div
                style={{
                  padding: "6px 12px",
                  border: "1px solid #ccc",
                  borderRadius: 12,
                  minWidth: 220,
                  background: "#eee",
                  fontSize: 16,
                  color: "#000",
                }}
              >
                <p>
                  <strong>{comment.name}</strong>
                </p>
                <p style={{ paddingInline: 6, overflowWrap: "anywhere" }}>
                  {comment.comment}
                </p>
                <p
                  style={{
                    textAlign: "end",
                    fontSize: 14,
                    color: "#999",
                  }}
                >
                  {comment.timestamp}
                </p>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentList;

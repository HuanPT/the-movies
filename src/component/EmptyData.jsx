import { Empty } from "antd";
import React from "react";

export default function EmptyData({ color }) {
  return (
    <Empty description={<p style={{ color: color }}>Không có dữ liệu!</p>} />
  );
}

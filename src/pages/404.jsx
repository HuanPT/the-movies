import React from "react";
import Link from "next/link";
import { Button, Result } from "antd";
export default function _error() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={
        <Link href="/home">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
}

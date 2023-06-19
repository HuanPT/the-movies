import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Popconfirm } from "antd";

export default function ButtonRemoveAll({
  className,
  handleClickRemoveAll,
  description,
}) {
  return (
    <Popconfirm
      placement="left"
      title="Bạn có chắc"
      description={description}
      onConfirm={handleClickRemoveAll}
      okText="Có"
      cancelText="Không"
    >
      <Button icon={<FaTrashAlt />} className={className}>
        Xóa tất cả
      </Button>
    </Popconfirm>
  );
}

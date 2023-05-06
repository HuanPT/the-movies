import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button, message } from "antd";

export default function ButtonAddToCollection({ size = "small", className }) {
  const [icon, setIcon] = useState(false);

  const handleChangeIcon = (e) => {
    e.preventDefault();
    if (icon === true) {
      message.success("Đã xóa khỏi bộ sưu tập");
    } else message.success("Đã thêm vào bộ sưu tập");
    setIcon(!icon);
  };

  return (
    <Button
      icon={icon ? <FaHeart /> : <FaRegHeart />}
      className={className}
      size={size}
      onClick={handleChangeIcon} 
      title={icon ? "Xóa khỏi bộ sưu tập" : "Thêm vào bộ sưu tập"}
    />
  );
}

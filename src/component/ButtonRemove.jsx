import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { Button, message } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import { removeMovieFromField } from "@/lib/auth";

export default function ButtonRemove({ size = "default", className, id }) {
  const {  user, setUserData } = useAuthContext();

  const handleRemove = (e) => {
    e.preventDefault();

    removeMovieFromField(user.uid, id, "histories");
    message.success("Đã xóa khỏi lịch sử xem");

    setUserData((prevUserData) => ({
      ...prevUserData,
      histories: prevUserData.histories.filter((item) => item !== id),
    }));
  };

  return (
    <Button
      htmlType="button"
      icon={<FaRegTimesCircle />}
      className={className}
      size={size}
      onClick={handleRemove}
      style={{ background: "transparent", border: "none" }}
      title={"Xóa khỏi lịch sử xem"}
    />
  );
}

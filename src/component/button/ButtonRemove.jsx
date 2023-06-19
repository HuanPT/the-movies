import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { Button, Tooltip, message } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import { removeMovieFromField } from "@/lib/auth";

export default function ButtonRemove({ size = "default", className, id }) {
  const { user, setUserData } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "Remove from histories";
  
  const handleRemove = (e) => {
    e.preventDefault();

    removeMovieFromField(user.uid, id, "histories");
    messageApi.success(
      {
        key,
        content: "Đã xóa khỏi lịch sử xem!",
        duration: 2,
      },
      1000
    );
    message.success("Đã xóa khỏi lịch sử xem");

    setTimeout(() => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        histories: prevUserData.histories.filter((item) => item !== id),
      }));
    }, 500);
  };

  return (
    <>
      {contextHolder}
      <Tooltip
        placement="topRight"
        color="var(--333-color)"
        title="Xóa khỏi lịch sử xem"
        arrow={{ pointAtCenter: true }}
      >
        <Button
          htmlType="button"
          icon={<FaRegTimesCircle />}
          className={className}
          size={size}
          onClick={handleRemove}
        />
      </Tooltip>
    </>
  );
}

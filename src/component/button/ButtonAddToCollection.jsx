import React, { useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button, message } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import { addMovieToField, removeMovieFromField } from "@/lib/auth";

export default function ButtonAddToCollection({
  size = "default",
  className,
  id,
}) {
  const { userData, user, setUserData } = useAuthContext();
  const collections = useMemo(() => userData?.collections || [], [userData]);
  const [isInCollection, setIsInCollection] = useState(false);

  useEffect(() => {
    setIsInCollection(collections.includes(id));
  }, [collections, id]);

  const [messageApi, contextHolder] = message.useMessage();
  const keyAdd = "add to collections";
  const keyRemove = "remove from collections";
  const handleCollection = (e) => {
    e.preventDefault();
    if (isInCollection) {
      removeMovieFromField(user.uid, id, "collections");
      messageApi.success(
        {
          key: keyRemove,
          type: "success",
          content: "Đã xóa khỏi bộ sưu tập!",
          duration: 2,
        },
        1000
      );
    } else {
      addMovieToField(user.uid, id, "collections");
      messageApi.success(
        {
          key: keyAdd,
          type: "success",
          content: "Đã thêm vào bộ sưu tập!",
          duration: 2,
        },
        1000
      );
    }
    setTimeout(() => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        collections: isInCollection
          ? prevUserData.collections.filter((item) => item !== id)
          : [...prevUserData.collections, id],
      }));
    }, 500);
    setIsInCollection(!isInCollection);
  };

  return (
    <>
      {contextHolder}
      <Button
        htmlType="button"
        icon={isInCollection ? <FaHeart /> : <FaRegHeart />}
        className={className}
        size={size}
        onClick={handleCollection}
        style={{ background: "transparent", border: "none" }}
        title={isInCollection ? "Xóa khỏi bộ sưu tập" : "Thêm vào bộ sưu tập"}
      />
    </>
  );
}

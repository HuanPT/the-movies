import React from "react";
import styles from "@/styles/button/ButtonChangeAvatar.module.css";
import { FaCamera } from "react-icons/fa";
import { useAuthContext } from "@/context/Auth.context";
import { updateAvatar } from "@/lib/auth";
import { message } from "antd";

const acceptTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
const checkFileType = (type) => {
  return acceptTypes.includes(type);
};

export default function ButtonUpdateAvatar({ onFileChange }) {
  const { setUserData, user } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "changeAvatar";
  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        return;
      } else {
        if (checkFileType(file.type)) {
          await updateAvatar(file, user.uid, onFileChange);
          file.preview = URL.createObjectURL(file);
          setTimeout(() => {
            setUserData((prevData) => ({
              ...prevData,
              avatar: file.preview,
            }));
          }, 1000);
          messageApi.success(
            {
              key,
              content: "Upload thành công!",
              duration: 2,
            },
            1000
          );
        } else {
          messageApi.error(
            {
              key,
              content: "File upload không đúng định dạng",
              duration: 2,
            },
            1000
          );
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.avatar__edit}>
        <form id="form__image" className={styles.form__image}>
          <input
            type="file"
            className={styles.imageUpload}
            id="imageUpload"
            onChange={handleFileChange} // Xử lý sự kiện thay đổi tệp tin
          />
          <label htmlFor="imageUpload" title="Thay đổi ảnh đại diện">
            <FaCamera />
          </label>
        </form>
      </div>
    </>
  );
}

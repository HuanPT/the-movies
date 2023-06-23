import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import { FaUser } from "react-icons/fa";
import crown from "../../public/crown.svg";
import Image from "next/image";
import ButtonUpdateAvatar from "./button/ButtonUpdateAvatar";

export default function UserAvatar({
  size = 38,
  width = 14,
  height = 14,
  bottom = "73%",
  left = "95%",
  borderSize = "2px",
  isChange = false,
}) {
  const { userData } = useAuthContext();
  const [avatar, setAvatar] = useState(null);
  const [isVip, setIsVip] = useState(false);

  useEffect(() => {
    if (userData) {
      setAvatar(userData.avatar);
      setIsVip(userData.vipStatus.isVip);
    }
  }, [userData]);

  const styleWrap = {
    position: "relative",
    width: "fit-content",
    margin: "0 auto",
    borderRadius: "50%",

    transition: "all .5s",
    backgroundImage: "linear-gradient(150deg, #ffd900, #b45264 70.68%)",
    /* Fill the inside with white */
    backgroundOrigin: "border-box",
    /* A transparent border, so the very edge of the button shows through */
    border: `${borderSize} solid transparent`,
  };

  const crownStyle = {
    position: "absolute",
    width: width,
    height: height,
    bottom: bottom,
    left: left,
  };

  return (
    <div style={styleWrap}>
      <Avatar icon={<FaUser />} src={avatar} alt="avatar" size={size} />
      {isVip && (
        <Image
          src={crown}
          style={crownStyle}
          alt="vip"
          width={24}
          height={24}
        />
      )}
      {isChange && <ButtonUpdateAvatar onFileChange={setAvatar} />}
    </div>
  );
}

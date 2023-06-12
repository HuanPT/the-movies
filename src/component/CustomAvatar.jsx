import React, { useMemo } from "react";
import { Avatar } from "antd";

import Image from "next/image";
import logoMin from "../../public/logo-min.png";
import crown from "../../public/crown.svg";
import { useAuthContext } from "@/context/Auth.context";

export default function CustomAvatar({ size = 38 }) {
  const { userData } = useAuthContext();

  const vip = useMemo(() => userData?.vipStatus.isVip, [userData]);


  const calc = ((12 * size) / 45).toFixed(1);
  const avatarStyle = {
    color: "transparent",
    position: "absolute",
    bottom: "40%",
    left: "90%",
    width: calc + "px",
  };

  const sizeAvatar = {
    width: size + "px",
    height: size + "px",
    lineHeight: size - 8 + "px",
    background: "#131313",
  };

  return (
    <div>
      <Avatar size={"large"} className="avatar" style={sizeAvatar}>
        <Image src={logoMin} alt="logo" />
      </Avatar>
      {vip && <Image src={crown} alt="vip" style={avatarStyle} />}
    </div>
  );
}

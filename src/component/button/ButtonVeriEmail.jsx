import { useAuthContext } from "@/context/Auth.context";
import { Button, message } from "antd";
import { sendEmailVerification } from "firebase/auth";
import React from "react";

export default function ButtonVeriEmail({ title }) {
  const { user } = useAuthContext();

  const handleVeriEmail = async () => {
    try {
      await sendEmailVerification(user);
      message.success({
        content: "Gửi thành công",
        duration: 2,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        type="link"
        style={{ paddingInline: 0 }}
        onClick={handleVeriEmail}
      >
        {title}
      </Button>
    </div>
  );
}

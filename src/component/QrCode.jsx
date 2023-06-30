import { Button, InputNumber, message } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/QrCode.module.css";
import { useAuthContext } from "@/context/Auth.context";
import { updateField } from "@/lib/auth";

export default function QrCode() {
  const { userData, setUserData, user } = useAuthContext();
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (userData) setUserInfo(userData.email);
  }, [userData]);
  const title = show ? "Xong" : "Nạp";

  const handlePlusMoney = async () => {
    if (show) {
      const newCoins = userData.coins + amount;
      await updateField(user.uid, newCoins, "coins");
      setUserData((prevData) => ({
        ...prevData,
        coins: newCoins,
      }));
      message.success("Nạp thành công!");
      setAmount(null);
    }
    setShow(!show);
  };

  const onChange = (value) => {
    setAmount(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrap__input}>
        <InputNumber
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\\s?|(,*)/g, "")}
          onChange={onChange}
          min={0}
          prefix="VND"
          style={{
            width: "100%",
            maxWidth: 200,
          }}
          size="large"
          disabled={show}
        />
        <Button size="large" onClick={handlePlusMoney}>
          {title}
        </Button>
      </div>

      {show && (
        <>
          <div className={styles.qrImg}>
            <Image
              src={`https://img.vietqr.io/image/BIDV-12410003672251-compact2.png?amount=${amount}&addInfo=${userInfo} ${amount}`}
              fill
              alt="qr code"
            />
          </div>
        </>
      )}
    </div>
  );
}

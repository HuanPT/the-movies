import { Button, InputNumber } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import styles from "@/styles/QrCode.module.css";

export default function QrCode({ uid = "" }) {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(null);

  const title = show ? "Xong" : "Nạp";

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
        <Button size="large" onClick={() => setShow(!show)}>
          {title}
        </Button>
      </div>

      {show && (
        <>
          <div className={styles.qrImg}>
            <Image
              src={`https://img.vietqr.io/image/BIDV-22010007332901-compact2.png?amount=${amount}&addInfo=${uid} ${amount}`}
              fill
              alt="qr code"
            />
          </div>
        </>
      )}
    </div>
  );
}

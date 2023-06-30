import React, { useState } from "react";
import { Button, Modal } from "antd";
import ChooseToBuy from "./ChooseToBuy";

export default function ButtonVipMode({ id, openNotification }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        size="large"
        style={{
          fontWeight: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        Kích hoạt phim
      </Button>
      <Modal
        title="Khi kích hoạt phim, bạn có 2 lựa chọn: kích hoạt phim cho riêng từng tập phim lẻ, hoặc cho toàn bộ phim trên web:"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={992}
        footer={null}
      >
        <ChooseToBuy
          id={id}
          setOpen={setOpen}
          openNotification={openNotification}
        />
        <p style={{ marginTop: 12, fontSize: 16, color: "#fff" }}>
          Sau khi chọn một gói, tài khoản bạn sẽ bị trừ số coin tương ứng. Coin
          còn lại trong tài khoản bạn vẫn được duy trì vĩnh viễn (cho những lần
          kích hoạt sau).
        </p>
      </Modal>
    </>
  );
}

import React, { useState } from "react";
import { Button, Modal } from "antd";

export default function ButtonVipMode({ children }) {
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
        Kích hoạt VIP mode
      </Button>
      <Modal
        title="Với chế độ VIP mode, bạn có 2 lựa chọn: kích hoạt VIP cho riêng từng tập phim lẻ, hoặc cho toàn bộ phim trên web:"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={992}
        footer={null}
      >
        {children}

        <p style={{ marginTop: 12, fontSize: 16 }}>
          Sau khi chọn một gói, tài khoản bạn sẽ bị trừ số coin tương ứng. Coin
          còn lại trong tài khoản bạn vẫn được duy trì vĩnh viễn (cho những lần
          kích hoạt sau).
        </p>
      </Modal>
    </>
  );
}

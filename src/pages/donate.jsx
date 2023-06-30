import Head from "next/head";
import React from "react";
import styles from "@/styles/Donate.module.css";
import { Col, Row } from "antd";
import QrCode from "@/component/QrCode";

export default function Donate() {
  return (
    <>
      <Head>
        <title>Nạp coin</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.main}>
          <div>
            <h3 className={styles.title}>Nạp coin</h3>
            <p>Để ủng hộ website & xem phim, hãy nạp coin theo cách bên dưới</p>
          </div>

          <Row>
            <Col span={24}>
              <h3 className={styles.title}>Chuyển khoản</h3>
              <ol>
                <li>
                  Nhập số tiền bạn muốn chuyển vào bên dưới rồi bấm
                  &quot;Nạp&quot; (bao nhiêu cũng được)
                </li>
                <li>
                  Vào ứng dụng ngân hàng của bạn trên điện thoại và chọn chức
                  năng quét mã QR trong đó
                </li>
                <li>Quét mã QR bên dưới</li>
                <li>
                  Hoàn tất quá trình chuyển tiền (tên người nhận tiền là PHAM
                  THANH HUAN)
                </li>
              </ol>
              <p>
                Sau khoảng 1, 2 phút tài khoản bạn trên web sẽ được cộng số coin
                tương ứng.
              </p>

              <QrCode />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

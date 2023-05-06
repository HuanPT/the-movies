import React from "react";
import { Button, Card, Col, Row } from "antd";

import styles from "@/styles/ChooseToBuy.module.css";
export default function ChooseToBuy({ handleBuyOption, id = false }) {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card
          title="Theo từng phim lẻ"
          headStyle={{ textAlign: "center" }}
          style={{ height: "100%" }}
        >
          <div className={styles.price}> 1.000 coin/phim/10 ngày</div>
          <ul className={styles.desc}>
            <li>Bạn có thể xem phim đó trong 10 ngày 10 ngày.</li>
            <li>Phù hợp nếu bạn ít thời gian xem phim.</li>
          </ul>
          {id ? (
            <Button type="primary" shape="round" size="large" block danger>
              Chọn mua
            </Button>
          ) : (
            <div className={styles.notButton}>
              Kích hoạt tại phim bạn muốn xem
            </div>
          )}
        </Card>
      </Col>

      <Col span={12}>
        <Card
          title="Tất cả phim trên web"
          headStyle={{ textAlign: "center" }}
          style={{ height: "100%" }}
        >
          <div className={styles.price}>30.000 coin/tháng</div>
          <ul className={styles.desc}>
            <li>Xem toàn bộ phim trên web trong 30 ngày.</li>
            <li>Phù hợp nếu bạn hay xem phim.</li>
          </ul>
          <Button type="primary" block shape="round" size="large" danger>
            Chọn mua
          </Button>
        </Card>
      </Col>
    </Row>
  );
}

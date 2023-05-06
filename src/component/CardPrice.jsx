import React from "react";
import { Col, Card, Button } from "antd";

export default function CardPrice({ title, handleClick }) {
  return (
    <Col span={12}>
      <Card title={title} bodyStyle={{ textAlign: "center" }}>
        <div> 1.000 coin/phim/10 ngày</div>
        <ul style={{ listStyle: "circle" }}>
          <li>Bạn có thể xem phim đó trong 10 ngày 10 ngày.</li>
          <li>Phù hợp nếu bạn ít thời gian xem phim.</li>
        </ul>
        <Button type="primary" block onClick={handleClick}>
          Chọn mua
        </Button>
      </Card>
    </Col>
  );
}

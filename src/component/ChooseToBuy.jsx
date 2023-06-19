import React, { useMemo } from "react";
import { Button, Card, Col, Row, message } from "antd";
import { cost, numberWithCommas } from "@/lib/common";

import styles from "@/styles/ChooseToBuy.module.css";
import { useAuthContext } from "@/context/Auth.context";
export default function ChooseToBuy({ id }) {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "ChooseToBuy";
  const { vipMovie, vipMonth } = cost;
  const { user, userData, setUserData } = useAuthContext();
  console.log(userData);

  const userCoin = useMemo(() => userData?.coins, [userData]);

  console.log(userCoin);

  const handleRentFilm = (id, vipMovie, vipMonth) => {
    if (id) {
      if (vipMonth < userCoin) {
        const start = Date.now();
        // const timeStart = 
      } else {
        messageApi.error(
          {
            key,
            content: "Số coin của bạn không đủ để thực hiện giao dịch",
            duration: 2,
          },
          1000
        );
      }
    }
  };

  return (
    <>
      {contextHolder}

      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Theo từng phim lẻ"
            headStyle={{ textAlign: "center" }}
            style={{ height: "100%" }}
          >
            <div className={styles.price}>
              {numberWithCommas(vipMovie)} coin/phim/10 ngày
            </div>
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
            <div className={styles.price}>
              {numberWithCommas(vipMonth)} coin/30 ngày
            </div>
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
    </>
  );
}

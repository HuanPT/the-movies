import React, { useMemo } from "react";
import { Button, Card, Col, Popconfirm, Row } from "antd";
import { cost, handleTime, numberWithCommas } from "@/lib/common";

import styles from "@/styles/button/ChooseToBuy.module.css";
import { useAuthContext } from "@/context/Auth.context";
import { addMovieToField, updateField } from "@/lib/auth";

export default function ChooseToBuy({ id, setOpen, openNotification }) {
  const { vipMovie, vipMonth } = cost;
  const { user, userData, setUserData } = useAuthContext();
  const userCoin = useMemo(() => userData?.coins, [userData]);

  const handleRentFilm = async (e, price, id) => {
    e.preventDefault();
    if (user.emailVerified) {
      if (price <= userCoin) {
        const newCoin = userCoin - price;
        const userId = user.uid;
        if (id) {
          const rent = handleTime(10, id);
          await addMovieToField(userId, rent, "rentMovies");
          await updateField(userId, newCoin, "coins");
          setOpen(false);
          setUserData((prevData) => ({
            ...prevData,
            coins: newCoin,
            rentMovies: [...prevData.rentMovies, rent],
          }));
          openNotification(
            "success",
            "Thành công",
            "Kích hoạt phim thành công!"
          );
        } else {
          const rent = handleTime(30);
          await updateField(userId, rent, "vipStatus");
          await updateField(userId, newCoin, "coins");
          setOpen(false);
          setUserData((prevData) => ({
            ...prevData,
            coins: newCoin,
            vipStatus: rent,
          }));
          openNotification(
            "success",
            "Thành công",
            "Kích hoạt VIP thành công!"
          );
        }
      } else {
        setOpen(false);
        return openNotification(
          "error",
          "Thất bại",
          "Số coin của bạn không đủ để kích hoạt!"
        );
      }
    } else {
      setOpen(false);
      return openNotification("error", "Thất bại", "Bạn cần xác thực mail!");
    }
  };

  return (
    <>
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
              <Popconfirm
                placement="top"
                title="Xác nhận"
                description={"Kích hoạt phim này"}
                onConfirm={(e) => handleRentFilm(e, vipMovie, id)}
                okText="Có"
                cancelText="Không"
              >
                <Button type="primary" shape="round" size="large" block danger>
                  Chọn mua
                </Button>
              </Popconfirm>
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
            <Popconfirm
              placement="top"
              title="Xác nhận"
              description={"Kích hoạt theo tháng"}
              onConfirm={(e) => handleRentFilm(e, vipMonth)}
              okText="Có"
              cancelText="Không"
            >
              <Button type="primary" block shape="round" size="large" danger>
                Chọn mua
              </Button>
            </Popconfirm>
          </Card>
        </Col>
      </Row>
    </>
  );
}

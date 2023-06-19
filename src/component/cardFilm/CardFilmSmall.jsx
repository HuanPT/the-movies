import React, { useMemo } from "react";
import Image from "next/image";
import styles from "@/styles/CardFilmSmall.module.css";

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { Space, Row, Col } from "antd";
import { srcCardSmall } from "@/lib/api.service";
import { numberTofixed } from "@/lib/common";
import ButtonAddToCollection from "../button/ButtonAddToCollection";

export default function CardFilmSmall({
  link = "/",
  title,
  pathImg,
  imdbPoint,
  date,
  id,
}) {
  const dateLocal = useMemo(() => {
    return new Date(date).toLocaleString("vi-VN", { dateStyle: "short" });
  }, [date]);

  return (
    <Link href={link} title={title}>
      <div className={styles.card__movie}>
        <Image
          src={srcCardSmall + pathImg}
          width={88}
          height={132}
          alt={title}
          className={styles.img}
        />
        <Row className={styles.wrap__des}>
          <Col span={24}>
            <p className={styles.title}>{title}</p>
          </Col>
          <Col className={styles.wrap__option} span={24}>
            <Row align="middle">
              <Col span={17}>
                <Space>
                  {date ? (
                    <span className={styles.date}>
                      Khởi chiếu <br /> {dateLocal}
                    </span>
                  ) : (
                    <>
                      <FaStar style={{ color: "yellow" }} />
                      <span>{numberTofixed(imdbPoint)}</span>
                    </>
                  )}
                </Space>
              </Col>
              <Col span={7}>
                <ButtonAddToCollection className={styles.iconHeart} id={id} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Link>
  );
}

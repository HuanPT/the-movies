import React from "react";
import Image from "next/image";
import styles from "@/styles/cardFilm/CardSearch.module.css";

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { Space, Row, Col } from "antd";
import { srcCardSmall } from "@/lib/api.service";
import { numberTofixed } from "@/lib/common";
import { useState } from "react";
import { useEffect } from "react";
import { fallBack } from "@/lib/api.context";

export default function CardSearch({ link = "/", title, pathImg, imdbPoint }) {
  const [img, setImg] = useState(fallBack);

  useEffect(() => {
    if (pathImg) setImg(srcCardSmall + pathImg);
  }, [pathImg]);
  return (
    <Link href={link} title={title}>
      <div className={styles.card__movie}>
        <div className={styles.img}>
          <Image src={img} fill sizes="auto" alt={"title"} />
        </div>
        <Row className={styles.wrap__des}>
          <Col span={24}>
            <p className={styles.title}>{title}</p>
          </Col>
          <Col className={styles.wrap__option} span={24}>
            <Row align="middle">
              <Col span={24}>
                <Space>
                  <FaStar style={{ color: "yellow" }} />
                  <span>{numberTofixed(imdbPoint)}</span>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Link>
  );
}

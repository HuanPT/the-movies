import { srcImgOriginal, srcCardImg } from "@/lib/api.service";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import styles from "@/styles/MovieDetailImage.module.css";
import { FaPlayCircle, FaRegPlayCircle } from "react-icons/fa";
import Link from "next/link";
import ButtonVipMode from "./ButtonVipMode";
import ButtonAddToCollection from "./ButtonAddToCollection";

export default function MovieDetailImage({
  pathImg,
  title = "title",
  posterImg,
  subtitle = "sub title",
  id,
}) {
  return (
    <Row>
      <Col span={24}>
        <div className={styles.imgBig}>
          <Image
            src={srcImgOriginal + pathImg}
            width={1400}
            height={450}
            title={title}
            alt={title}
          />
        </div>
        <div className={styles.info__wrap}>
          <Row wrap={false} align="bottom">
            <Col span={0} md={24}>
              <div className={styles.img__small}>
                <Image
                  src={srcCardImg + posterImg}
                  width={192}
                  height={288}
                  title={title}
                  alt={title}
                />
              </div>
            </Col>
          </Row>
          <div className={styles.film__infoText}>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <ul className={styles.listButton}>
              <li>
                <Link href={`/watch/${id}`}>
                  <Button
                    type="primary"
                    size="large"
                    danger
                    className={styles.wrap__button}
                  >
                    <FaRegPlayCircle />
                    Xem Phim
                  </Button>
                </Link>
              </li>
              <li>
                <ButtonVipMode />
              </li>
              <li>
                <ButtonAddToCollection
                  size="large"
                  className={styles.buttonCollection}
                />
              </li>
            </ul>
          </div>
        </div>
      </Col>
    </Row>
  );
}

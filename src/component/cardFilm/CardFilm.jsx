import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlay, FaStar } from "react-icons/fa";
import { Space, Row, Col } from "antd";
import styles from "@/styles/cardFilm/CardFilm.module.css";
import Image from "next/image";
import { srcCardImg, srcW533 } from "@/lib/api.service";
import { numberTofixed } from "@/lib/common";
import ButtonAddToCollection from "../button/ButtonAddToCollection";
import ButtonRemove from "../button/ButtonRemove";
import { fallBack } from "@/lib/api.context";

export default function CardFilm({
  title,
  link,
  posterPath,
  dropPath,
  id,
  imdbPoint,
  isClose = false,
  priority = false,
}) {
  const [posterSrc, setPosterSrc] = useState(fallBack);
  const [dropSrc, setDropSrc] = useState(fallBack);

  useEffect(() => {
    if (posterPath) {
      setPosterSrc(srcCardImg + posterPath);
    }

    if (dropPath) {
      setDropSrc(srcW533 + dropPath);
    }
  }, [posterPath, dropPath]);

  return (
    <Link href={link} title={title} style={{ display: "block" }}>
      <div className={styles.card__movie} id={id}>
        <Row>
          <Col span={0} md={24}>
            <div className={styles.customImg}>
              <Image
                src={posterSrc}
                fill
                alt={title}
                sizes="auto"
                className={styles.img}
                priority={priority}
              />
            </div>
          </Col>
          <Col span={24} md={0}>
            <div className={styles.customImg}>
              <Image
                src={dropSrc}
                fill
                sizes="auto"
                alt={title}
                priority={priority}
              />
            </div>
          </Col>
        </Row>
        <p className={styles.movie__title}>{title}</p>
        <div className={styles.icon__play}>
          <FaPlay />
        </div>
        <div className={styles.actions}>
          <div className={styles.imdb}>
            <Space style={{ fontSize: 18 }}>
              <FaStar style={{ color: "yellow" }} />
              <span>{numberTofixed(imdbPoint)}</span>
            </Space>
          </div>
          <div className={styles.collection}>
            <ButtonAddToCollection className={styles.iconHeart} id={id} />
          </div>
        </div>
      </div>
      {isClose && (
        <ButtonRemove size="small" className={styles.btnRemove} id={id} />
      )}
    </Link>
  );
}

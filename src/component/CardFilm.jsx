import React, { useState } from "react";
import Link from "next/link";
import { FaHeart, FaPlay, FaRegHeart, FaStar } from "react-icons/fa";
import { Space, Button, message, Row, Col } from "antd";
import styles from "@/styles/CardFilm.module.css";
import Image from "next/image";
import img from "../../public/imagePlaceholder.svg";
import { srcCardImg, srcW533 } from "@/lib/api.service";
import { numberTofixed } from "@/lib/common";
import ButtonAddToCollection from "./ButtonAddToCollection";

export default function CardFilm({ title, link, posterPath,dropPath, id, imdbPoint }) {
  return (
    <div className={styles.card__movie} id={id}>
      <Link href={link} title={title}>
        <Row>
          <Col span={0} md={24}>
            <Image
              src={srcCardImg + posterPath}
              width={167}
              height={288}
              alt={title}
            />
          </Col>
          <Col span={24} md={0}>
            <Image
              src={srcW533 + dropPath}
              width={318}
              height={179}
              alt={title}
            />
          </Col>
        </Row>
        <p className={styles.movie__title}>{title}</p>
        <div className={styles.icon__play}>
          <FaPlay />
        </div>
        <div className={styles.actions}>
          <div className={styles.imdb}>
            <Space>
              <FaStar style={{ color: "yellow" }} />
              <span>{numberTofixed(imdbPoint)}</span>
            </Space>
          </div>
          <div className={styles.collection}>
            <ButtonAddToCollection className={styles.iconHeart} />
          </div>
        </div>
      </Link>
    </div>
  );
}

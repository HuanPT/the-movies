import { srcImgOriginal, srcCardImg } from "@/lib/api.service";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import styles from "@/styles/movies/MovieDetailImage.module.css";
import { FaRegPlayCircle } from "react-icons/fa";
import Link from "next/link";
import ButtonVipMode from "../button/ButtonVipMode";
import ButtonAddToCollection from "../button/ButtonAddToCollection";
import { useAuthContext } from "@/context/Auth.context";
import { fallBack } from "@/lib/api.context";

export default function MovieDetailImage({
  pathImg,
  title = "title",
  posterImg,
  subtitle = "sub title",
  id,
  priority = false,
  openNotification,
}) {
  const [posterSrc, setPosterSrc] = useState(fallBack);
  const [dropSrc, setDropSrc] = useState(fallBack);
  const { userData } = useAuthContext();
  const [isVip, setIsVip] = useState(false);
  const [isRent, setIsRent] = useState(false);

  const [rentMovies, userVip] = useMemo(() => {
    const rentMovies = userData?.rentMovies || [];
    const userVip = userData?.vipStatus.isVip || false;
    return [rentMovies, userVip];
  }, [userData]);

  useEffect(() => {
    const currentDate = Date.now();
    const isRentMovie = rentMovies.some(
      (movie) => movie.id === id && movie.end > currentDate
    );
    setIsRent(isRentMovie);
    setIsVip(userVip);
  }, [rentMovies, id, userData]);

  useEffect(() => {
    if (posterImg) {
      setPosterSrc(srcCardImg + posterImg);
    }

    if (pathImg) {
      setDropSrc(srcImgOriginal + pathImg);
    }
  }, [posterImg, pathImg]);

  return (
    <Row>
      <Col span={24}>
        <div className={styles.imgBig}>
          <Image
            src={dropSrc}
            fill
            sizes="auto"
            priority={priority}
            title={title}
            alt={title}
          />
        </div>
        <div className={styles.info__wrap}>
          <Row wrap={false} gutter={16} align="bottom">
            <Col span={0} lg={6}>
              <div className={styles.img__small}>
                <Image
                  src={posterSrc}
                  fill
                  sizes="auto"
                  title={title}
                  alt={title}
                  priority={priority}
                />
              </div>
            </Col>
            <Col span={24} lg={18}>
              <div className={styles.film__infoText}>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <ul className={styles.listButton}>
                  {isVip || isRent ? (
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
                  ) : (
                    <li>
                      <ButtonVipMode
                        openNotification={openNotification}
                        id={id}
                      />
                    </li>
                  )}

                  <li>
                    <ButtonAddToCollection
                      size="large"
                      className={styles.buttonCollection}
                      id={id}
                    />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

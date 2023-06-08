import React from "react";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";
import Styles from "@/styles/MovieList.module.css";
import { Col, Row } from "antd";

export default function MovieList({ children, category, link, style }) {
  return (
    <section className={Styles.section__movieList}>
      <Row>
        <Col flex={1}>
          <div className={Styles.movie__category}>
            <h1 style={style}>{category}</h1>
            {link && (
              <Link href={link} className={Styles.view__all}>
                Xem tất cả
                <FaAngleDoubleRight />
              </Link>
            )}
          </div>
          <div className={Styles.movie__container}>{children}</div>
        </Col>
      </Row>
    </section>
  );
}

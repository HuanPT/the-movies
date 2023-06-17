import React from "react";
import Link from "next/link";
import { FaAngleDoubleRight, FaTrashAlt } from "react-icons/fa";
import Styles from "@/styles/MovieList.module.css";
import { Button, Col, Row } from "antd";

export default function MovieList({
  children,
  category,
  link,
  style,
  deleteAll = false,
  handleClickRemoveAll,
}) {
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
            {deleteAll && (
              <Button
                icon={<FaTrashAlt />}
                className={Styles.btnRemove}
                onClick={handleClickRemoveAll}
              >
                Xóa tất cả
              </Button>
            )}
          </div>
          <div className={Styles.movie__container}>{children}</div>
        </Col>
      </Row>
    </section>
  );
}

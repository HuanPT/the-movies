import { formatString, numberTofixed, runtime } from "@/lib/common";
import Link from "next/link";
import React from "react";
import styles from "@/styles/movies/MovieInfo.module.css";

export default function MovieInfo({
  year,
  genres,
  country,
  editor,
  score,
  time,
  children,
}) {
  const styleColor = (score) => {
    let style = {};
    if (score < 4) return (style = { background: "#571435" });
    else if (score >= 4 && score < 7)
      return (style = { background: "#e3b71e" });
    else return (style = { background: "#21d07a" });
  };

  const list = (data, useLink, param) => {
    const length = data.length;
    let list;
    if (length === 0) {
      return "Đang xác minh";
    } else {
      list = data.map((item, i) => (
        <span key={item.name}>
          {useLink ? (
            <Link href={`/${useLink}?${param}=${item.id || item.iso_3166_1}`}>
              {item.name}
            </Link>
          ) : (
            <span>{item.name}</span>
          )}
          {formatString(i, length)}
        </span>
      ));
    }
    return list;
  };

  return (
    <div>
      <dl className={styles.info}>
        <dt>Năm phát hành</dt>
        <dd>
          {year ? (
            <Link href={`/search?primary_release_year=${year.split("-")[0]}`}>
              {year.split("-")[0]}
            </Link>
          ) : (
            "Đang xác minh"
          )}
        </dd>
        <dt>Thể loại</dt>
        <dd>{list(genres, "search", "with_genres")}</dd>
        <dt>Quốc gia</dt>
        <dd>{list(country, "search", "with_origin_country")}</dd>
        <dt>Đạo diễn</dt>
        <dd>{list(editor)}</dd>
        <dt>Điểm đánh giá</dt>
        <dd>
          <span className={styles.score} style={styleColor(score)}>
            {numberTofixed(score)}
          </span>
        </dd>
        <dt>Thời lượng</dt>
        <dd>{runtime(time)}</dd>
        <dt>Diễn viên</dt>
        <dd className={styles.listCast}>{children}</dd>
      </dl>
    </div>
  );
}

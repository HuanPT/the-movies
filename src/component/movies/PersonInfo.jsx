import { srcH632 } from "@/lib/api.service";
import Image from "next/image";
import React from "react";
import styles from "@/styles/movies/PersonInfo.module.css";

export default function PersonInfo({
  name,
  profilePath,
  birthday,
  placeBirth,
  gender,
}) {
  const converGender = (gender) => {
    if (gender === 1) return "Nữ";
    else return "Nam";
  };

  const birthLocal = (birthday) => {
    return new Date(birthday).toLocaleString("vi-VN", { dateStyle: "short" });
  };

  return (
    <div className={styles.person}>
      <div className={styles.person__avatar}>
        <Image
          src={srcH632 + profilePath}
          width={300}
          height={450}
          alt={name}
        />
      </div>
      <div className={styles.person__info}>
        <h2>Thông tin cá nhân</h2>
        <dl>
          <dt>Nghê nghiệp</dt>
          <dd>Diễn viên</dd>
          <dt>Giới tính</dt>
          <dd>{converGender(gender)}</dd>
          <dt>Ngày sinh</dt>
          <dd>{birthLocal(birthday)}</dd>
          <dt>Nơi sinh</dt>
          <dd>{placeBirth}</dd>
        </dl>
      </div>
    </div>
  );
}

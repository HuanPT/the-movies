import React from "react";
import Image from "next/image";
import styles from "@/styles/intro/SectionImgAnimation.module.css";
import srcImg from "/public/img-mobile2.png";
import srcGif from "/public/download-icon.gif";
export default function SectionImgAnimation() {
  return (
    <>
      <div className={styles.card__animation}>
        <Image src={srcImg} alt="mobile" width={"48px"} height={"48px"} />
      </div>
      <div className={styles.card__text}>
        <h3>Cậu bé mất tích</h3>
        <h5>Đang tải xuống...</h5>
      </div>
      <div className={styles.card__custom}>
        <Image src={srcGif} alt="icon Gif" width={"70px"} height={"70px"} />
      </div>
    </>
  );
}

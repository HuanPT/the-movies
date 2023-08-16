import React from "react";
import Image from "next/image";
import srcImg from "/public/backgroundHeader.jpg";
import styles from "@/styles/intro/SectionBgr.module.css";
import SectionText from "./SectionText";
import IntroEmail from "./IntroEmail";

export default function SectionBgr() {
  const customCss = {
    textAlign: "center",
  };

  const tittle =
    "Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác.";

  const subTittle = "Xem ở mọi nơi. Hủy bất kỳ lúc nào.";
  return (
    <>
      <div className={styles.section__bgr}>
        <div className={styles.bgr}></div>
        <Image src={srcImg} fill alt="bgr" priority />
      </div>
      <SectionText title={tittle} subTitle={subTittle} customStyle={customCss}>
        <IntroEmail />
      </SectionText>
    </>
  );
}

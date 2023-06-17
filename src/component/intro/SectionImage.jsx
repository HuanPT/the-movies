import React from "react";
import styles from "@/styles/intro/SectionImage.module.css";
import Image from "next/image";

export default function SectionImage({
  srcImg,
  video,
  imgAnimated,
  children,
  alt = "img",
  customStyle,
}) {
  return (
    <div className={styles.section__img}>
      <div className={styles.section__wrapImg}>
        <Image src={srcImg} fill alt={alt} />
        <div className={styles.card__animation} style={customStyle}>
          {video && <video src={video} autoPlay muted loop></video>}
          {imgAnimated && (
            <Image src={imgAnimated} alt={alt} width={50} height={50}></Image>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

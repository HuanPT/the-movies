import React from "react";
import styles from "@/styles/intro/SectionText.module.css";
export default function SectionText({
  title,
  subTitle,
  children,
  customStyle,
}) {
  return (
    <div className={styles.section__text}>
      <h1 className={styles.title} style={customStyle}>
        {title}
      </h1>
      <h2 className={styles.sub__title}>{subTitle}</h2>
      {children}
    </div>
  );
}

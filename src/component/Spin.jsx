import React from "react";
import styles from "@/styles/Spin.module.css";

export default function Spin() {
  return (
    <div className={styles.loading}>
      <div>
        <div className={styles.c1}></div>
        <div className={styles.c2}></div>
        <div className={styles.c3}></div>
        <div className={styles.c4}></div>
      </div>
    </div>
  );
}

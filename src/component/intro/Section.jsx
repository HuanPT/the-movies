import React from "react";
import styles from "@/styles/intro/Section.module.css";

export default function Section({ children }) {
  return <section className={styles.section__card}>{children}</section>;
}

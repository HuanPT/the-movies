import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/CardCast.module.css";
import { srcW300 } from "@/lib/api.service";

export default function CardCast({ id, pathImg, name, character }) {
  return (
    <Link href={`/person/${id}`} className={styles.actor}>
      <div className={styles.actor__img}>
        <Image src={srcW300 + pathImg} width={140} height={140} alt={name} />
      </div>
      <span className={styles.name}>
        {name} <br />
      </span>
      <span>{character}</span>
    </Link>
  );
}

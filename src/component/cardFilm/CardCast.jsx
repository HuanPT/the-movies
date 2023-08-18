import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "@/styles/cardFilm/CardCast.module.css";
import { srcW300 } from "@/lib/api.service";
import { FaUser } from "react-icons/fa";

import { Avatar } from "antd";

export default function CardCast({ id, pathImg, name, character }) {
  const [path, setPath] = useState();
  return (
    <Link href={`/person/${id}`} className={styles.actor}>
      <div className={styles.actor__img}>
        {/* <Image
          src={srcW300 + pathImg}
          width={140}
          height={140}
          loading="lazy"
          alt={name}
        /> */}
        <Avatar
          size={150}
          icon={<FaUser />}
          src={srcW300 + pathImg}
          alt={name}
        />
      </div>
      <span className={styles.name}>
        {name} <br />
      </span>
      <span>{character}</span>
    </Link>
  );
}

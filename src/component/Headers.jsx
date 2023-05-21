import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import logoMin from "../../public/logo-min.png";
import logo from "../../public/logo.png";
import crown from "../../public/crown.svg";

import Link from "next/link";
import {
  FaHistory,
  FaInfoCircle,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaHeart,
  FaFilm,
  FaDonate,
} from "react-icons/fa";
import styles from "@/styles/Headers.module.css";
import { useAuthContext } from "@/context/Auth.context";
import { Button, Input, Dropdown, Row, Col, message } from "antd";
import { logout } from "@/lib/auth";
import CustomAvatar from "./CustomAvatar";
import { useRouter } from "next/router";

const items = [
  {
    key: "1",
    label: (
      <Link rel="noopener noreferrer" href="/account">
        Tài khoản
      </Link>
    ),
    icon: <FaInfoCircle style={{ fontSize: 16 }} />,
    className: `${styles.menu__item}`,
  },
  {
    key: "2",
    label: (
      <Link rel="noopener noreferrer" href="/collection">
        Bộ sưu tập
      </Link>
    ),
    icon: <FaFilm style={{ fontSize: 16 }} />,
    className: `${styles.menu__item}`,
  },
  {
    key: "3",
    label: (
      <Link rel="noopener noreferrer" href="/donate">
        Nạp coin
      </Link>
    ),
    icon: <FaDonate style={{ fontSize: 16 }} />,
    className: `${styles.menu__item}`,
  },
  {
    key: "4",
    label: (
      <Link rel="noopener noreferrer" onClick={logout} href="/">
        Đăng xuất
      </Link>
    ),
    icon: <FaSignOutAlt style={{ fontSize: 16 }} />,
    className: `${styles.menu__item}`,
  },
];

export default function Headers() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { Search } = Input;
  const [headerStyle, setHeaderStyle] = useState({});

  const heightRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      let currentHeight = window.scrollY;

      if (heightRef.current < currentHeight) {
        setHeaderStyle({
          top: -70,
        });
        heightRef.current = currentHeight;
      } else {
        setHeaderStyle({
          top: 0,
          background: currentHeight == 80 ? "transparent" : "#131313",
        });
        heightRef.current = currentHeight;
      }
      if (currentHeight == 0) {
        setHeaderStyle({
          top: 0,
          background: "transparent",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [heightRef]);

  const onSearch = (value) => {
    if (!value) return;
    else {
      router.push(`/search?q=${value}`);
    }
  };

  return (
    <>
      <header className={styles.header} style={headerStyle}>
        {!user ? (
          <Row
            justify="space-between"
            align="middle"
            style={{ marginInline: "5vw" }}
          >
            <Col>
              <div className={styles.header__topLogo}>
                <Link href="/">
                  <Row>
                    <Col span={0} sm={24}>
                      <Image src={logo} alt="logo" />
                    </Col>
                    <Col span={24} sm={0}>
                      <Image src={logoMin} alt="logo" />
                    </Col>
                  </Row>
                </Link>
              </div>
            </Col>
            <Col>
              <div className={styles.header__login}>
                <Link href="/signin">
                  <Button type="primary" danger>
                    Đăng nhập
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        ) : (
          <Row
            justify="space-between"
            align="middle"
            wrap={false}
            style={{ marginInline: "5vw" }}
          >
            <Col>
              <div className={styles.header__topLogo}>
                <Link href="/home">
                  <Row>
                    <Col span={0} sm={24}>
                      <Image src={logo} alt="logo" />
                    </Col>
                    <Col span={24} sm={0}>
                      <Image src={logoMin} alt="logo" />
                    </Col>
                  </Row>
                </Link>
              </div>
            </Col>
            <Col>
              <div className={styles.header__search}>
                <Search onSearch={onSearch} placeholder="Tìm kiếm" />
              </div>
            </Col>
            <Col>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomRight"
                arrow
                trigger={["click"]}
                className={styles.menu__list}
              >
                <div>
                  <CustomAvatar />
                </div>
              </Dropdown>
            </Col>
          </Row>
        )}
      </header>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoMin from "../../public/logo-min.png";
import logo from "../../public/logo.png";

import Link from "next/link";
import { FaInfoCircle, FaSignOutAlt, FaFilm, FaDonate } from "react-icons/fa";
import styles from "@/styles/Headers.module.css";
import { useAuthContext } from "@/context/Auth.context";
import { Button, Dropdown, Row, Col } from "antd";
import { logout } from "@/lib/auth";
import SearchBox from "./search/SearchBox";
import UserAvatar from "./UserAvatar";

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
          borderBottom: "thin solid #555",
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

  return (
    <>
      <header className={styles.header} style={headerStyle}>
        {!user ? (
          <Row
            justify="space-between"
            align="middle"
            style={{ marginInline: "5vw", gap: 12 }}
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
            style={{ marginInline: "5vw", gap: 12 }}
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
            <Col className={styles.header__search}>
              {/* <Search
                  onSearch={onSearch}
                  style={{ width: 350 }}
                  placeholder="Tìm kiếm ..."
                /> */}
              <SearchBox />
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
                  {/* <CustomAvatar /> */}
                  <UserAvatar />
                </div>
              </Dropdown>
            </Col>
          </Row>
        )}
      </header>
    </>
  );
}

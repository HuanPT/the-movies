import React, { useMemo, useState, useEffect } from "react";
import { Row, notification } from "antd";

import styles from "@/styles/Account.module.css";
import { fetchData, numberWithCommas } from "@/lib/common";
import ChangePassword from "@/component/ChangePassword";
import ButtonVipMode from "@/component/button/ButtonVipMode";
import MovieList from "@/component/movies/MovieList";
import { useAuthContext } from "@/context/Auth.context";
import RemainderTime from "@/component/remainderTime";
import UserAvatar from "@/component/UserAvatar";
import Head from "next/head";
import { updateField } from "@/lib/auth";
import ButtonVeriEmail from "@/component/button/ButtonVeriEmail";
const key = "notiMovieId";

export default function Account() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, mes, desc) => {
    api[type]({
      key,
      message: mes,
      description:
        type == "error" ? (
          <div>
            {desc}{" "}
            {!isVeriEmail && <ButtonVeriEmail title={"Xác thực email"} />}
          </div>
        ) : (
          desc
        ),
    });
  };

  const { userData, user, setUserData } = useAuthContext();
  const [rentList, setRentList] = useState([]);
  const [isRent, setIsRent] = useState(false);
  const [isVeriEmail, setIsVeriEmail] = useState(false);

  const [
    vipMode,
    startTime,
    end,
    displayName,
    email,
    createAt,
    coins,
    rentMovies,
  ] = useMemo(() => {
    const vipMode = userData?.vipStatus?.isVip;
    const startTime = userData?.vipStatus?.startTime;
    const end = userData?.vipStatus.end;
    const displayName = userData?.username;
    const email = userData?.email;
    const createAt = userData?.createOnTime;
    const coins = numberWithCommas(userData?.coins);
    const rentMovies = userData?.rentMovies;

    return [
      vipMode,
      startTime,
      end,
      displayName,
      email,
      createAt,
      coins,
      rentMovies,
    ];
  }, [userData]);
  useEffect(() => {
    const fetchDataAndCheckVipStatus = async () => {
      if (vipMode) {
        const currentTime = Date.now();
        const remainderTime = end - currentTime;
        if (remainderTime <= 0) {
          const newVipStatus = { ...userData.vipStatus, isVip: false };
          setUserData((prevData) => ({
            ...prevData,
            vipStatus: newVipStatus,
          }));
          await updateField(user.uid, newVipStatus, "vipStatus");
        }
      }

      fetchData(rentMovies, setRentList);
      setIsRent(rentMovies?.length > 0);
    };
    if (user) {
      setIsVeriEmail(user.emailVerified);
    }
    fetchDataAndCheckVipStatus();
  }, [userData]);

  return (
    <>
      <Head>
        <title>Tài khoản</title>
      </Head>
      {contextHolder}
      <div id={styles.account}>
        <div className={styles.avatar}>
          <UserAvatar
            size={160}
            width={36}
            height={36}
            bottom="75%"
            left="92%"
            borderSize="4px"
            isChange={true}
          />
        </div>
        <div className={styles.wrap__user}>
          <h1>{displayName}</h1>
          <p>
            Số dư: <span className={styles.coin}>{coins}</span> coins
          </p>
          <p>
            Email: <span>{email}</span>
          </p>
          {!isVeriEmail && <ButtonVeriEmail title={"Xác thực email"} />}
          <p>
            Ngày gia nhập: <span>{createAt}</span>
          </p>
          {vipMode ? (
            <>
              <div>
                Ngày kích hoạt: <span>{startTime}</span>
              </div>
              <div>
                Thời hạn còn:{" "}
                <RemainderTime end={end} className={styles.date} />
              </div>
              <ChangePassword />
            </>
          ) : (
            <>
              <ChangePassword />
              <ButtonVipMode openNotification={openNotification} />
            </>
          )}
        </div>
      </div>

      <MovieList category="Các phim đã kích hoạt Vip Mode">
        <p className={styles.desc}>
          Chú ý: chế độ VIP Mode có thời gian hiệu lực 10 ngày đối với phim. Tức
          là sau khi bạn kích hoạt VIP Mode cho một phim nào đó, bạn có thể xem
          phim đó trong vòng 10 ngày.
          <br />
          Còn số dư trong tài khoản bạn thì không có thời hạn sử dụng. Bạn muốn
          dùng lúc nào cũng được. Chẳng hạn tài khoản bạn còn 5.000 coin, thì 10
          năm sau quay lại trang web bạn vẫn có thể dùng 5.000 coin đó để kích
          hoạt VIP Mode cho phim.
        </p>

        <div className={styles.noRent}>
          {vipMode ? (
            "Bạn có thể xem mọi phim trên trang web."
          ) : isRent ? (
            <Row gutter={[12, 12]}>{rentList}</Row>
          ) : (
            "Bạn chưa kích hoạt VIP  Mode cho phim nào, hoặc các phim được kích hoạt đã hết thời hạn."
          )}
        </div>
      </MovieList>
    </>
  );
}

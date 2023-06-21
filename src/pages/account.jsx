import React, { useMemo, useState, useEffect } from "react";
import { Row } from "antd";
import CustomAvatar from "@/component/CustomAvatar";

import styles from "@/styles/Account.module.css";
import {
  fetchData,
  formatNumberToDateTime,
  numberWithCommas,
} from "@/lib/common";
import ChangePassword from "@/component/ChangePassword";
import ButtonVipMode from "@/component/button/ButtonVipMode";
import MovieList from "@/component/movies/MovieList";
import { useAuthContext } from "@/context/Auth.context";
import RemainderTime from "@/component/remainderTime";

export default function Account() {
  const { userData, user } = useAuthContext();
  const [rentList, setRentList] = useState([]);
  const [isRent, setIsRent] = useState(false);
  const [countDown, setCountDown] = useState(0);

  const [
    vipMode,
    startTime,
    endVipMode,
    end,
    displayName,
    email,
    createAt,
    coins,
    rentMovies,
  ] = useMemo(() => {
    const vipMode = userData?.vipStatus?.isVip;
    const startTime = userData?.vipStatus?.startTime;
    const endVipMode = userData?.vipStatus?.expirationTime;
    const end = userData?.vipStatus.end;
    const displayName = userData?.username;
    const email = userData?.email;
    const createAt = userData?.createOnTime;
    const coins = numberWithCommas(userData?.coins);
    const rentMovies = userData?.rentMovies;

    return [
      vipMode,
      startTime,
      endVipMode,
      end,
      displayName,
      email,
      createAt,
      coins,
      rentMovies,
    ];
  }, [userData]);

  useEffect(() => {
    fetchData(rentMovies, setRentList);
    setIsRent(rentMovies?.length > 0);
  }, [userData]);

  return (
    <>
      <div id={styles.account}>
        <CustomAvatar size={150} isChange={true} />

        <div className={styles.wrap__user}>
          <h1>{displayName}</h1>
          <p>
            Số dư: <span className={styles.coin}>{coins}</span> coins
          </p>
          <p>
            Email: <span>{email}</span>
          </p>
          <p>
            Ngày gia nhập: <span>{createAt}</span>
          </p>
          {vipMode ? (
            <>
              <div>
                Ngày kích hoạt: <span>{startTime}</span>
              </div>
              <div>
                {/* Thời hạn còn: <span className={styles.date}>{endVipMode}</span> */}
                Thời hạn còn:{" "}
                <RemainderTime end={end} className={styles.date} />
              </div>
              <ChangePassword />
            </>
          ) : (
            <>
              <ChangePassword />
              <ButtonVipMode />
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
          ) : isRent > 0 ? (
            <Row gutter={[12, 12]}>{rentList}</Row>
          ) : (
            "Bạn chưa kích hoạt VIP  Mode cho phim nào, hoặc các phim được kích hoạt đã hết thời hạn."
          )}
        </div>
      </MovieList>
    </>
  );
}

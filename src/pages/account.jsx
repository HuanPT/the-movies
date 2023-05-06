import React, { useMemo, useState, useEffect } from "react";
import { Row, Col } from "antd";
import CustomAvatar from "@/component/CustomAvatar";

import styles from "@/styles/Account.module.css";
// import { useUserContext } from "@/context/User.context";
import { formatNumberToDateTime, numberWithCommas } from "@/lib/common";
import ChangePassword from "@/component/ChangePassword";
import ButtonVipMode from "@/component/ButtonVipMode";
import ChooseToBuy from "@/component/ChooseToBuy";
import MovieList from "@/component/MovieList";
import CardFilm from "@/component/CardFilm";
import { useAuthContext } from "@/context/Auth.context";

const listRent = async (rentMovies) => {
  if (Array.isArray(rentMovies)) {
    const promises = rentMovies?.map(async (item) => {
      const res = await fetch(`
          https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi
        `);

      const data = await res.json();

      return { data, end: item.end };
    });

    const list = await Promise.all(promises);

    const listMovie = list.map((item) => (
      <Col key={item.data.id} lg={4} md={6} sm={8} xs={12}>
        <CardFilm
          id={item.data.id}
          title={item.data.title}
          link={`/movie/${item.data.id}`}
          imdbPoint={item.data.vote_average}
          dropPath={item.data.backdrop_path || item.data.poster_path}
          posterPath={item.data.poster_path || item.data.backdrop_path}
        />
        <div></div>
      </Col>
    ));
    return listMovie;
  }
  return;
};

export default function Account() {
  const { userData } = useAuthContext();
  const [rentList, setRentList] = useState([]);

  const [vipMode, endVipMode, displayName, email, createAt, coins, rentMovies] =
    useMemo(() => {
      const vipMode = userData?.vipStatus?.isVip;
      const endVipMode = userData?.vipStatus?.end;
      const displayName = userData?.username;
      const email = userData?.email;
      const createAt = userData?.createOnTime;
      const coins = numberWithCommas(userData?.coins);
      const rentMovies = userData?.rentMovies;

      return [
        vipMode,
        endVipMode,
        displayName,
        email,
        createAt,
        coins,
        rentMovies,
      ];
    }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await listRent(rentMovies);
      setRentList(list);
    };
    fetchData();
  }, [rentMovies]);

  const date = new Date();
  const dateToNumber = date.getTime();

  let length = rentMovies ? rentMovies.length : 0;

  // listRent(rentMovies);
  return (
    <>
      <div id={styles.account}>
        <Row justify={"center"}>
          <Col>
            <CustomAvatar size={150} />
          </Col>
        </Row>

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

          <div>
            <ChangePassword />
          </div>

          <div>
            {vipMode ? (
              <div>
                Ngày hết hạn Vip Mode:{" "}
                <span className={styles.date}>
                  {formatNumberToDateTime(endVipMode)}
                </span>
              </div>
            ) : (
              <ButtonVipMode>
                <ChooseToBuy />
              </ButtonVipMode>
            )}
          </div>
        </div>
      </div>

      <MovieList category="Các phim đã kích hoạt Vip Mode">
        <p className={styles.desc}>
          Chú ý: chế độ VIP Mode có thời gian hiệu lực 10 ngày đối với phim. Tức
          là sau khi bạn kích hoạt VIP Mode cho một phim nào đó, bạn có thể xem
          phim đó trong vòng 10 ngày.
          <br />
          Còn số dư trong tài khoản bạn thì không có thời hạn sử dụng. Bạn muốn
          dùng lúc nào cũng được. Chẳng hạn tài khoản bạn còn 5000 coin, thì 10
          năm sau quay lại trang web bạn vẫn có thể dùng 5000 coin đó để kích
          hoạt VIP Mode cho phim.
        </p>

        <div className={styles.noRent}>
          {vipMode ? (
            "Bạn có thể xem mọi phim trên trang web."
          ) : length > 0 ? (
            <Row gutter={[12, 12]}>{rentList}</Row>
          ) : (
            "Bạn chưa kích hoạt VIP  Mode cho phim nào, hoặc các phim được kích hoạt đã hết thời hạn."
          )}
        </div>
      </MovieList>
    </>
  );
}

//  export const getServerSideProps  = async () => {
//    const { userData } = useUserContext();
//  };

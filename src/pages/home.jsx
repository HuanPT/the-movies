import CardFilm from "@/component/cardFilm/CardFilm";
import MovieList from "@/component/movies/MovieList";
import SetupCarousel from "@/component/SetupCarousel";
import { Col, Row, Space } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { fetchGenres, fetchMovies, genres } from "../lib/api.service";
import Head from "next/head";
import TabsRight from "@/component/TabsRight";
import CardFilmSmall from "@/component/cardFilm/CardFilmSmall";
import { FaHotjar } from "react-icons/fa";
import Spin from "@/component/Spin";

export default function Home({
  listGenres,
  popular,
  trendingDay,
  trendingWeek,
  upcoming,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isStickToTop, setIsStickToTop] = useState(null);
  const [isStickToBottom, setIsStickToBottom] = useState(null);
  const [styleSidebar, setStyleSidebar] = useState({});
  const sidebarRef = useRef(null);

  // useEffect(() => {
  //   let lastScrollPosition = 0;
  //   const handleScroll = () => {
  //     let currentScrollPosition = window.scrollY;
  //     let isScrollingDown = currentScrollPosition > lastScrollPosition;
  //     let isScrollingUp = currentScrollPosition < lastScrollPosition;

  //     let scrollBottom = currentScrollPosition + window.innerHeight;
  //     const sidebar = sidebarRef.current; // Lấy sidebar bằng className
  //     if (!sidebar) return;

  //     let sidebarTop = sidebar.offsetTop;
  //     let sidebarBottom = sidebarTop + sidebar.offsetHeight;
  //     let isAlwaysSticky = sidebar.offsetHeight <= window.innerHeight;

  //     if (isStickToTop && isAlwaysSticky) {
  //       return;
  //     }

  //     if (
  //       (!isStickToTop &&
  //         currentScrollPosition <= sidebarTop &&
  //         isAlwaysSticky) ||
  //       (!isStickToTop &&
  //         currentScrollPosition <= sidebarTop &&
  //         !isAlwaysSticky)
  //     ) {
  //       setStyleSidebar({
  //         position: "sticky",
  //         top: "0px",
  //       });

  //       setIsStickToTop(true);
  //       setIsStickToBottom(false);
  //     } else if (
  //       isStickToTop &&
  //       (currentScrollPosition > sidebarTop || isAlwaysSticky)
  //     ) {
  //       // sidebar.style.position = "relative";
  //       // sidebar.style.top = "0px";
  //       // sidebar.style.marginTop = `${currentScrollPosition}px`;
  //       setStyleSidebar({
  //         position: "sticky",
  //         top: `${currentScrollPosition}px`,
  //       });
  //       setIsStickToTop(false);
  //       setIsStickToBottom(false);
  //     } else if (
  //       !isStickToBottom &&
  //       isScrollingDown &&
  //       scrollBottom >= sidebarBottom
  //     ) {
  //       // sidebar.style.position = "sticky";
  //       // sidebar.style.marginTop = "0px";
  //       // sidebar.style.top = `${window.innerHeight - sidebar.offsetHeight}px`;
  //       setStyleSidebar({
  //         position: "sticky",
  //         top: `${window.innerHeight - sidebar.offsetHeight}px`,
  //       });
  //       setIsStickToTop(false);
  //       setIsStickToBottom(true);
  //     } else if (
  //       isStickToBottom &&
  //       (isScrollingUp || scrollBottom < sidebarBottom)
  //     ) {
  //       // sidebar.style.position = "relative";
  //       // sidebar.style.marginTop = `${scrollBottom - sidebar.offsetHeight}px`;
  //       // sidebar.style.top = "0px";
  //       setStyleSidebar({
  //         position: "sticky",
  //         top: `0px`,
  //       });
  //       setIsStickToTop(false);
  //       setIsStickToBottom(false);
  //     }

  //     lastScrollPosition = currentScrollPosition;
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [isStickToTop, isStickToBottom]);

  useEffect(() => {
    // Tạm dừng hiển thị trạng thái loading sau khi dữ liệu đã được tải
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []); // Chỉ chạy một lần khi component được render

  const styleH1 = {
    fontStyle: "normal",
    fontWeight: 400,
    textTransform: "uppercase",
  };

  const renderCardFilmSmall = (data, date = false) => {
    return data.map((item) => (
      <CardFilmSmall
        key={item.id}
        id={item.id}
        title={item.title}
        link={`/movie/${item.id}`}
        imdbPoint={item.vote_average}
        date={date ? item.release_date : null}
        pathImg={item.poster_path || item.backdrop_path}
      />
    ));
  };

  const dayMovies = renderCardFilmSmall(trendingDay.data);
  const weekMovie = renderCardFilmSmall(trendingWeek.data);
  const comingMovies = renderCardFilmSmall(upcoming.data, true);

  const items = [
    {
      key: "1",
      label: trendingDay.name,
      children: dayMovies,
    },
    {
      key: "2",
      label: trendingWeek.name,
      children: weekMovie,
    },
  ];

  const listTopRate = popular.data.map((item) => (
    <CardFilm
      key={item.id}
      id={item.id}
      title={item.title}
      link={`/movie/${item.id}`}
      imdbPoint={item.vote_average}
      dropPath={item.backdrop_path}
      posterPath={item.poster_path}
    />
  ));

  const GenreCategory = listGenres.map((genre) => {
    const film = genre.data.slice(0, 12).map((item) => (
      <Col key={item.id} xs={12} sm={8} md={6}>
        <CardFilm
          key={item.id}
          id={item.id}
          title={item.title}
          link={`/movie/${item.id}`}
          imdbPoint={item.vote_average}
          dropPath={item.backdrop_path}
          posterPath={item.poster_path}
        />
      </Col>
    ));

    return (
      <MovieList
        key={genre.id}
        category={genre.name}
        link={`/search?with_genres=${genre.id}`}
      >
        <Row gutter={[12, 16]} justify="space-evenly">
          {film}
        </Row>
      </MovieList>
    );
  });

  return (
    <>
      <Head>
        <title>Trang chủ</title>
        <meta
          name="description"
          content="TheMovies - Mang cả thế giới đến với bạn!"
        />
      </Head>

      {isLoading ? (
        <Spin />
      ) : (
        <Space direction="vertical" size="small" style={{ display: "flex" }}>
          <Row justify="center">
            <Col>
              <MovieList category={popular.name}>
                <SetupCarousel>{listTopRate}</SetupCarousel>
              </MovieList>
            </Col>
          </Row>
          <Row>
            <Col span={24} lg={18}>
              <div className="wrap__section">
                <Row>
                  <Col span={24}>{GenreCategory}</Col>
                </Row>
              </div>
            </Col>
            <Col span={0} lg={6}>
              <div className="sidebar" ref={sidebarRef} style={styleSidebar}>
                <MovieList
                  category={
                    <>
                      <FaHotjar /> Trending
                    </>
                  }
                  style={styleH1}
                >
                  <TabsRight items={items} />
                </MovieList>

                <MovieList category={upcoming.name} style={styleH1}>
                  {comingMovies}
                </MovieList>
              </div>
            </Col>
          </Row>
        </Space>
      )}
    </>
  );
}

// export const getStaticProps = async () => {
//   const urls = [
//     `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=vi`,
//     `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=vi`,
//     `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&language=vi`,
//     `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=vi&region=us`,
//   ];

//   const [popularData, trendingDayData, trendingWeekData, upcomingData] =
//     await Promise.all(urls.map(fetchMovies));

//   const popular = { id: "popular", name: "Phổ biến", data: popularData };

//   const trendingDay = {
//     id: "trending__day",
//     name: "Ngày",
//     data: trendingDayData,
//   };

//   const trendingWeek = {
//     id: "trending__Week",
//     name: "Tuần",
//     data: trendingWeekData,
//   };

//   const upcoming = {
//     id: "upcoming",
//     name: "Phim sắp chiếu",
//     data: upcomingData,
//   };

//   const listGenres = await fetchGenres(genres);

//   return {
//     props: { popular, listGenres, trendingDay, trendingWeek, upcoming },
//   };
// };

export const getServerSideProps = async () => {
  const key = process.env.NEXT_PUBLIC_API_KEY_MOVIE;
  const urls = [
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=vi`,
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=vi`,
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&language=vi`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=vi&region=us`,
  ];

  const [popularData, trendingDayData, trendingWeekData, upcomingData] =
    await Promise.all(urls.map(fetchMovies));

  const popular = { id: "popular", name: "Phổ biến", data: popularData };

  const trendingDay = {
    id: "trending__day",
    name: "Ngày",
    data: trendingDayData,
  };

  const trendingWeek = {
    id: "trending__Week",
    name: "Tuần",
    data: trendingWeekData,
  };

  const upcoming = {
    id: "upcoming",
    name: "Phim sắp chiếu",
    data: upcomingData,
  };

  const listGenres = await fetchGenres(genres);

  return {
    props: { popular, listGenres, trendingDay, trendingWeek, upcoming },
  };
};

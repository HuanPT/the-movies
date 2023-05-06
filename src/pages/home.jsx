import CardFilm from "@/component/CardFilm";
import MovieList from "@/component/MovieList";
import SetupCarousel from "@/component/SetupCarousel";
import { Col, Row, Space } from "antd";
import React from "react";
import { fetchGenres, fetchMovies, genres } from "../lib/api.service";
import Head from "next/head";
import TabsRight from "@/component/TabsRight";
import CardFilmSmall from "@/component/CardFilmSmall";

export default function Home({
  listGenres,
  popular,
  trendingDay,
  trendingWeek,
  upcoming,
}) {
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
      dropPath={item.backdrop_path || item.poster_path}
      posterPath={item.poster_path || item.backdrop_path}
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
          dropPath={item.backdrop_path || item.poster_path}
          posterPath={item.poster_path || item.backdrop_path}
        />
      </Col>
    ));

    return (
      <MovieList
        key={genre.id}
        category={genre.name}
        link={`/genres/${genre.id}`}
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

      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <Row justify="center">
          <Col>
            <MovieList category={popular.name}>
              <SetupCarousel>{listTopRate}</SetupCarousel>
            </MovieList>
          </Col>
        </Row>
        <Row>
          <Col md={24} lg={18}>
            <div className="wrap__section">
              <Row>{GenreCategory}</Row>
            </div>
          </Col>
          <Col span={0} lg={6}>
            <MovieList category={"Trending"} style={styleH1}>
              <TabsRight items={items} />
            </MovieList>

            <MovieList category={upcoming.name} style={styleH1}>
              {comingMovies}
            </MovieList>
          </Col>
        </Row>
      </Space>
    </>
  );
}

export const getStaticProps = async () => {
  const urls = [
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`,
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`,
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi&region=us`,
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



// export const getStaticProps = async () => {
//   function randomNum() {
//     return Math.floor(Math.random() * 3) + 1;
//   }

//   const promises = genres.map(async (genre) => {
//     const res = await fetch(
//       `https://api.themoviedb.org/3/discover/movie?api_key=${
//         process.env.NEXT_PUBLIC_API_KEY_MOVIE
//       }&with_genres=${genre.id}&language=vi&page=${randomNum()}`
//     );
//     const data = await res.json();
//     return {
//       id: genre.id,
//       name: genre.name,
//       data: data.results,
//     };
//   });

//   const results = await Promise.allSettled(promises);
//   const listGenres = results
//     .filter((result) => {
//       console.log(result.status);
//       result.status === "fulfilled";
//     })
//     .map((result) => result.value);

//   return {
//     props: {
//       listGenres,
//     },
//   };
// };

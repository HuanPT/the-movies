import Head from "next/head";
import React, { useMemo, useEffect, useState } from "react";
import { Row, Tabs, Col } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import MovieList from "@/component/MovieList";
import CardFilm from "@/component/CardFilm";

const dataMovies = async (arr) => {
  if (!Array.isArray(arr)) return [];
  const promises = arr.map(async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movie with ID ${id}`);
    }
    const data = await response.json();
    return data;
  });
  const list = await Promise.all(promises);
  return list;
};

export default function Collection() {
  const { userData } = useAuthContext();
  const [moviesHistories, setMoviesHistories] = useState([]);
  const [moviesCollection, setMoviesCollection] = useState([]);

  const collections = userData?.collection || [];
  const histories = userData?.histories || [];

  useEffect(() => {
    const fetchData = async (option, setState) => {
      const datas = await dataMovies(option);
      const list = datas.map((data) => (
        <Col key={data.id} xs={12} sm={8} md={6} lg={4}>
          <CardFilm
            key={data.id}
            id={data.id}
            title={data.title}
            link={`/movie/${data.id}`}
            imdbPoint={data.vote_average}
            dropPath={data.backdrop_path}
            posterPath={data.poster_path}
          />
        </Col>
      ));
      setState(list);
    };
    fetchData(collections, setMoviesCollection);
    fetchData(histories, setMoviesHistories);
  }, [collections, histories]);

  console.log(moviesHistories);
  const items = [
    {
      key: "1",
      label: "Bộ sưu tập",
      children: (
        <MovieList category="Bộ sưu tập">
          <Row gutter={[12, 12]}>
            {moviesCollection.length > 0
              ? moviesCollection
              : "Bộ sưu tập trống!"}
          </Row>
        </MovieList>
      ),
    },
    {
      key: "2",
      label: "Lịch sử xem",
      children: (
        <MovieList category="Lịch sử xem">
          <Row gutter={[12, 12]}>
            {moviesHistories.length > 0
              ? moviesHistories
              : "Lịch sử xem trống!"}
          </Row>
        </MovieList>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Bộ sựu tập phim</title>
      </Head>
      <div className="container">
        <Tabs defaultActiveKey="1" centered items={items} />
      </div>
    </>
  );
}

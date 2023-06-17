import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { Row, Tabs, Col, Button, message } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import MovieList from "@/component/movies/MovieList";
import CardFilm from "@/component/cardFilm/CardFilm";
import EmptyData from "@/component/EmptyData";
import { removeAllMovieFromField } from "@/lib/auth";

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

const FetchMoviesData = (
  collections,
  histories,
  pageCollection,
  pageHistory
) => {
  const [moviesHistory, setMoviesHistory] = useState([]);
  const [moviesCollection, setMoviesCollection] = useState([]);
  const [totalPageCollection, setTotalPageCollection] = useState(0);
  const [totalPageHistory, setTotalPageHistory] = useState(0);

  useEffect(() => {
    const collection = collections.slice(
      (pageCollection - 1) * 24,
      pageCollection * 24
    );
    const history = histories.slice((pageHistory - 1) * 24, pageHistory * 24);

    const fetchData = async (option, setState, isBtnX = false) => {
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
            isClose={isBtnX}
          />
        </Col>
      ));
      setState(list);
    };

    fetchData(collection, setMoviesCollection);
    fetchData(history, setMoviesHistory, true);

    setTotalPageCollection(Math.ceil(collections.length / 24));
    setTotalPageHistory(Math.ceil(histories.length / 24));
  }, [collections, histories, pageCollection, pageHistory]);

  return {
    moviesHistory,
    moviesCollection,
    totalPageCollection,
    totalPageHistory,
  };
};

export default function Collection() {
  const { user, userData, setUserData } = useAuthContext();
  const [pageCollection, setPageCollection] = useState(1);
  const [pageHistory, setPageHistory] = useState(1);

  const [collections, histories, userId] = useMemo(() => {
    const collections = userData?.collections || [];
    const histories = userData?.histories || [];
    const userId = user?.uid || null;
    return [collections, histories, userId];
  }, [userData, user]);

  const {
    moviesHistory,
    moviesCollection,
    totalPageCollection,
    totalPageHistory,
  } = FetchMoviesData(collections, histories, pageCollection, pageHistory);

  // useEffect(() => {
  //   const collection = collections.slice(
  //     (pageCollection - 1) * 24,
  //     pageCollection * 24
  //   );
  //   const history = histories.slice((pageHistory - 1) * 24, pageHistory * 24);

  //   const fetchData = async (option, setState, isBtnX = false) => {
  //     const datas = await dataMovies(option);
  //     const list = datas.map((data) => (
  //       <Col key={data.id} xs={12} sm={8} md={6} lg={4}>
  //         <CardFilm
  //           key={data.id}
  //           id={data.id}
  //           title={data.title}
  //           link={`/movie/${data.id}`}
  //           imdbPoint={data.vote_average}
  //           dropPath={data.backdrop_path}
  //           posterPath={data.poster_path}
  //           isClose={isBtnX}
  //         />
  //       </Col>
  //     ));
  //     setState(list);
  //   };

  //   fetchData(collection, setMoviesCollection);
  //   fetchData(history, setMoviesHistory, true);
  // }, [userData, pageCollection, pageHistory]);

  // const totalPageCollection = Math.ceil(collections.length / 24);
  // const totalPageHistory = Math.ceil(histories.length / 24);

  // const handleRemoveAllCollections = (e) => {
  //   e.preventDefault();
  //   removeAllMovieFromField(userId, "collections");
  //   setUserData((prevUserData) => ({
  //     ...prevUserData,
  //     collections: [],
  //   }));
  // };

  // const handleRemoveAllHistories = (e) => {
  //   e.preventDefault();
  //   removeAllMovieFromField(userId, "histories");
  //   setUserData((prevUserData) => ({
  //     ...prevUserData,
  //     histories: [],
  //   }));
  // };

  const handleRemoveAll = (e, field) => {
    e.preventDefault();
    removeAllMovieFromField(userId, field);
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: [],
    }));
  };

  const items = [
    {
      key: "1",
      label: "Bộ sưu tập",
      children: (
        <MovieList
          category="Bộ sưu tập"
          deleteAll={moviesCollection.length > 1 ? true : false}
          handleClickRemoveAll={(e) => handleRemoveAll(e, "collections")}
        >
          {moviesCollection.length > 0 ? (
            <>
              <Row gutter={[12, 12]}> {moviesCollection} </Row>
              {totalPageCollection > 1 && (
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    justifyContent: "center",
                    marginTop: 24,
                  }}
                >
                  {Array(totalPageCollection)
                    .fill(null)
                    .map((value, index) => (
                      <Button
                        htmlType="button"
                        key={index}
                        style={{
                          background:
                            pageCollection === index + 1
                              ? "var(--orange-color)"
                              : "",
                          color: pageCollection === index + 1 ? "#fff" : "",
                          border: "none",
                        }}
                        onClick={() => setPageCollection(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                </div>
              )}
            </>
          ) : (
            <EmptyData color={"#fff"} />
          )}
        </MovieList>
      ),
    },
    {
      key: "2",
      label: "Lịch sử xem",
      children: (
        <MovieList
          category="Lịch sử xem"
          deleteAll={moviesHistory.length > 1 ? true : false}
          handleClickRemoveAll={(e) => handleRemoveAll(e, "histories")}
        >
          {moviesHistory.length > 0 ? (
            <>
              <Row gutter={[12, 12]}>{moviesHistory}</Row>
              {totalPageHistory > 1 && (
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    justifyContent: "center",
                    marginTop: 24,
                  }}
                >
                  {Array(totalPageHistory)
                    .fill(null)
                    .map((value, index) => (
                      <Button
                        htmlType="button"
                        key={index}
                        style={{
                          background:
                            pageHistory === index + 1
                              ? "var(--orange-color)"
                              : "",
                          color: pageHistory === index + 1 ? "#fff" : "",
                          border: "none",
                        }}
                        onClick={() => setPageHistory(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                </div>
              )}
            </>
          ) : (
            <EmptyData color={"#fff"} />
          )}
        </MovieList>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Bộ sưu tập phim</title>
      </Head>
      <div className="container">
        <Tabs defaultActiveKey="1" centered items={items} />
      </div>
    </>
  );
}

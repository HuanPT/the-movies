import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { Row, Tabs, Button, message } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import MovieList from "@/component/movies/MovieList";
import EmptyData from "@/component/EmptyData";
import { removeAllMovieFromField } from "@/lib/auth";
import { fetchData } from "@/lib/common";

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
  const [messageApi, contextHolder] = message.useMessage();
  const key = "remove all";

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

  const handleRemoveAll = (e, field) => {
    e.preventDefault();
    removeAllMovieFromField(userId, field);
    messageApi.success(
      {
        key,
        content: "Đã xóa toàn bộ!",
        duration: 2,
      },
      1000
    );
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
          desc={"Xóa tất cả bộ sưu tập?"}
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
          desc={"Xóa tất cả Lịch sử xem?"}
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
      {contextHolder}
      <div className="container">
        <Tabs defaultActiveKey="1" centered items={items} />
      </div>
    </>
  );
}

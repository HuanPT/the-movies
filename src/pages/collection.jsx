import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { Tabs, message } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import { removeAllMovieFromField } from "@/lib/auth";
import { fetchData } from "@/lib/common";
import Spin from "@/component/Spin";
import MovieCollection from "@/component/movies/MovieCollection";
import CustomTabs from "@/component/CustomTabs";

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
      (pageCollection - 1) * 20,
      pageCollection * 20
    );
    const history = histories.slice((pageHistory - 1) * 20, pageHistory * 20);

    fetchData(collection, setMoviesCollection);
    fetchData(history, setMoviesHistory, true);

    setTotalPageCollection(Math.ceil(collections.length / 20));
    setTotalPageHistory(Math.ceil(histories.length / 20));
  }, [collections, histories, pageCollection, pageHistory]);

  return {
    moviesHistory,
    moviesCollection,
    totalPageCollection,
    totalPageHistory,
  };
};

export default function Collection() {
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const {
    moviesHistory,
    moviesCollection,
    totalPageCollection,
    totalPageHistory,
  } = FetchMoviesData(collections, histories, pageCollection, pageHistory);

  const handleRemoveAll = async (e, field) => {
    e.preventDefault();
    await removeAllMovieFromField(userId, field);
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
        <MovieCollection
          category="Bộ sưu tập"
          desc={"Xóa tất cả bộ sưu tập?"}
          deleteAll={moviesCollection.length > 1 ? true : false}
          movies={moviesCollection}
          totalPage={totalPageCollection}
          page={pageCollection}
          handlePageChange={setPageCollection}
          handleRemoveAll={(e) => handleRemoveAll(e, "collections")}
        />
      ),
    },
    {
      key: "2",
      label: "Lịch sử xem",
      children: (
        <MovieCollection
          category="Lịch sử xem"
          desc={"Xóa tất cả lịch sử xem?"}
          deleteAll={moviesHistory.length > 1 ? true : false}
          movies={moviesHistory}
          totalPage={totalPageHistory}
          page={totalPageHistory}
          handlePageChange={setPageHistory}
          handleRemoveAll={(e) => handleRemoveAll(e, "histories")}
        />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Bộ sưu tập phim</title>
      </Head>
      {contextHolder}
      {isLoading ? <Spin /> : <CustomTabs items={items} />}
    </>
  );
}

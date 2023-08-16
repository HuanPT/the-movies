import React, { useEffect, useState } from "react";
import { Button, Col, Pagination, Row } from "antd";
import { useRouter } from "next/router";
import MovieList from "@/component/movies/MovieList";
import CardFilm from "@/component/cardFilm/CardFilm";
import FilterFilm from "@/component/FilterFilm";
import styles from "@/styles/Search.module.css";
import { countries, genreOptions, years } from "@/lib/filters.service";
import { FaFilter } from "react-icons/fa";
import Head from "next/head";
import { handleParams } from "@/lib/common";
import Spin from "@/component/Spin";

export default function Search({ datas, q, p, otherQueries }) {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getTitle = () => {
      if (q) {
        return datas.results.length === 0
          ? `Không có kết quả cho từ khóa: ${q}`
          : `Kết quả tìm kiếm cho từ khóa: ${q}`;
      }

      const titleMappings = {
        primary_release_year: { title: "Năm phát hành", data: years },
        with_origin_country: { title: "Quốc gia", data: countries },
        with_genres: { title: "Thể loại", data: genreOptions },
        // Thêm các ánh xạ khác tại đây nếu cần
      };

      for (const [key, { title: fieldTitle, data }] of Object.entries(
        titleMappings
      )) {
        const value = otherQueries[key];
        const mappingItem = data.find((item) => item.value === value);
        if (mappingItem) {
          return `${fieldTitle}: ${mappingItem.label}`;
        }
      }

      return "^^!";
    };

    setTitle(getTitle());
    setIsLoading(false);
  }, [router]);

  const handlePageChange = (page) => {
    if (q) {
      return router.push(
        `/search?q=${encodeURIComponent(q)}&page=${page}&${handleParams(
          otherQueries
        )}`
      );
    }
    if (otherQueries) {
      return router.push(`/search?${handleParams(otherQueries)}&page=${page}`);
    }
  };

  const handlePrevClick = () => {
    if (p > 1) handlePageChange(p - 1);
  };

  const handleQuickJumperChange = (page) => {
    if (page >= 1 && page <= datas.total_pages) handlePageChange(page);
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") return <a onClick={handlePrevClick}>Prev</a>;
    if (type === "next")
      return (
        <a
          onClick={() => {
            if (p < datas.total_pages && p < 500) handlePageChange(p + 1);
          }}
        >
          Next
        </a>
      );
    return originalElement;
  };

  const customPagination = {
    total: datas.total_results > 10000 ? 10000 : datas.total_results,
    pageSize: 20,
    showQuickJumper: true,
    showSizeChanger: false,
    current: p,
    itemRender,
    onChange: handleQuickJumperChange,
  };

  const listMovies = datas.results.map((data, index) => (
    <Col key={data.id} xs={12} sm={8} md={6} lg={5}>
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

  const cancelFilterHandler = (e) => {
    e.preventDefault();
    if (q) return router.push(`/search?q=${encodeURIComponent(q)}&page=1`);
  };

  return (
    <>
      <Head>
        <title>Tìm kiếm </title>
      </Head>
      {isLoading ? (
        <Spin />
      ) : (
        <div>
          <div className={styles.wrapFilter}>
            <Row gutter={[12, 12]}>
              <Col sm={12} md={6}>
                <FilterFilm options={genreOptions} paramItem="with_genres" />
              </Col>
              <Col sm={12} md={6}>
                <FilterFilm
                  options={countries}
                  paramItem="with_origin_country"
                />
              </Col>
              <Col sm={12} md={6}>
                <FilterFilm options={years} paramItem="primary_release_year" />
              </Col>
              <Col sm={12} md={6}>
                <Button
                  type="primary"
                  icon={<FaFilter />}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                  }}
                  onClick={cancelFilterHandler}
                >
                  Bỏ lọc
                </Button>
              </Col>
            </Row>
          </div>
          <MovieList category={title}>
            <Row gutter={[12, 12]}>{listMovies}</Row>
          </MovieList>
          <Pagination {...customPagination} />
        </div>
      )}
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { q, page = 1, ...otherQueries } = query;
  const key = process.env.NEXT_PUBLIC_API_KEY_MOVIE;
  const decodedQ = q ? decodeURIComponent(q) : null;
  const parsedPage = parseInt(page, 10);

  const apiUrl = q
    ? `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(
        decodedQ
      )}&language=vi&page=${parsedPage}&${handleParams(otherQueries)}`
    : `https://api.themoviedb.org/3/discover/movie?api_key=${key}&${handleParams(
        otherQueries
      )}&language=vi&page=${parsedPage}`;

  const res = await fetch(apiUrl);
  const datas = await res.json();

  return {
    props: { datas, q: decodedQ, p: parsedPage, otherQueries },
  };
};

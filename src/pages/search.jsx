import React from "react";
import { Button, Col, Pagination, Row } from "antd";
import { useRouter } from "next/router";
import MovieList from "@/component/movies/MovieList";
import CardFilm from "@/component/cardFilm/CardFilm";
import FilterFilm from "@/component/FilterFilm";

import styles from "@/styles/Search.module.css";
import { countries, genreOptions, years } from "@/lib/filters.service";
import { FaFilter } from "react-icons/fa";
export default function Search({ datas, q, p, otherQueries }) {
  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`/search?q=${encodeURIComponent(q)}&page=${page}`);
  };

  console.log(otherQueries.primary_release_date);
  const handlePrevClick = () => {
    if (p > 1) handlePageChange(p - 1);
  };

  const handleQuickJumperChange = (page) => {
    if (page >= 1) handlePageChange(page);
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") return <a onClick={handlePrevClick}>Prev</a>;
    if (type === "next")
      return <a onClick={() => handlePageChange(p + 1)}>Next</a>;
    return originalElement;
  };

  const customPagination = {
    total: datas.total_results,
    pageSize: 20,
    showQuickJumper: true,
    showSizeChanger: false,
    defaultCurrent: p,
    itemRender,
    onChange: handleQuickJumperChange,
  };

  console.log(datas);
  console.log(q);

  const category =
    datas.results.length === 0
      ? `Không có kết quả cho từ khóa: ${q}`
      : `Kết quả tìm kiếm cho từ khóa: ${q}`;

  const listMovies = datas.results.map((data) => (
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

  return (
    <div>
      <div className={styles.wrapFilter}>
        <Row gutter={[12, 12]}>
          <Col sm={12} md={6}>
            <FilterFilm
              title="--- Thể loại phim ---"
              options={genreOptions}
              paramItem="genres"
            />
          </Col>
          <Col sm={12} md={6}>
            <FilterFilm
              title="--- Quốc Gia ---"
              options={countries}
              paramItem="country"
            />
          </Col>
          <Col sm={12} md={6}>
            <FilterFilm
              title="--- Năm phát hành ---"
              options={years}
              paramItem="primary_release_year"
            />
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
            >
              Bỏ lọc
            </Button>
          </Col>
        </Row>
      </div>
      <MovieList category={category}>
        <Row gutter={[12, 12]}>{listMovies}</Row>
      </MovieList>
      <Pagination {...customPagination} />
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { q, page = 1, ...otherQueries } = query;
  const decodedQ = decodeURIComponent(q);
  const parsedPage = parseInt(page, 10);

  //   const res = await fetch(
  //     `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&query=${decodedQ}&language=vi&page=${parsedPage}`
  //   );

  //   const datas = await res.json();

  //   return {
  //     props: { datas, q: decodedQ, p: parsedPage },
  //   };
  // };
  let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&query=${decodedQ}&language=vi&page=${parsedPage}`;

  if (otherQueries && "primary_release_year" in otherQueries) {
    apiUrl += `&primary_release_year=${otherQueries.primary_release_year}`;
  }

  const res = await fetch(apiUrl);
  const datas = await res.json();

  return {
    props: { datas, q: decodedQ, p: parsedPage, otherQueries },
  };
};

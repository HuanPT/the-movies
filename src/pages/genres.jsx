import React from "react";
import { Col, Pagination, Row } from "antd";
import { useRouter } from "next/router";
import MovieList from "@/component/movies/MovieList";
import CardFilm from "@/component/cardFilm/CardFilm";
import FilterFilm from "@/component/FilterFilm";

import styles from "@/styles/Search.module.css";
import { countries, genreOptions, years } from "@/lib/filters.service";

export default function Genres({ datas, p, genreId }) {
  const router = useRouter();
  const genres = genreOptions.find((item) => item.value === genreId)

  const handlePageChange = (page) => {
    router.push(`/genres?with_genres=${genreId}&page=${page}`);
  };

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

  const category = `Danh sách ${genres.label}`;

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
              paramItem="with_genres"
            />
          </Col>
          <Col sm={12} md={6}>
            <FilterFilm
              title="--- Quốc gia ---"
              options={countries}
              paramItem="with_origin_country"
            />
          </Col>
          <Col sm={12} md={6}>
            <FilterFilm
              title="--- Năm phát hành ---"
              options={years}
              paramItem="primary_release_year"
            />
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
  const { with_genres, page = 1 } = query;
  const key = process.env.NEXT_PUBLIC_API_KEY_MOVIE;
  const parsedPage = parseInt(page, 10);
  let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${with_genres}&language=vi&page=${parsedPage}`;

  const res = await fetch(apiUrl);
  const datas = await res.json();

  return {
    props: { datas, p: parsedPage, genreId: with_genres },
  };
};

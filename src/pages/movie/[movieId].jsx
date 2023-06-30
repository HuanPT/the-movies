import ButtonVeriEmail from "@/component/button/ButtonVeriEmail";
import CardCast from "@/component/cardFilm/CardCast";
import CardFilm from "@/component/cardFilm/CardFilm";
import MovieDetailImage from "@/component/movies/MovieDetailImage";
import MovieInfo from "@/component/movies/MovieInfo";
import MovieList from "@/component/movies/MovieList";
import SetupCarousel from "@/component/SetupCarousel";
import TrailerIframe from "@/component/TrailerIframe";
import { getOverview } from "@/lib/common";
import { Col, Row, notification } from "antd";
import Head from "next/head";
import React from "react";
const key = "notiMovieId";

export default function MovieId({ movie, credits, similar, trailer }) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, mes, des) => {
    api[type]({
      key,
      message: mes,
      description:
        type == "error" ? (
          <div>
            {des} <ButtonVeriEmail title={"Xác thực email ngay"} />
          </div>
        ) : (
          des
        ),
    });
  };

  const { results } = trailer;
  const { cast, crew } = credits;
  const { results: similarResults } = similar;

  const editor = crew.filter((item) => {
    return item.job === "Editor";
  });

  const listSimilar = (results) => {
    if (results.length === 0) return <p>Chưa có đề xuất cho bạn.</p>;
    const list = results.map((item) => {
      return (
        <CardFilm
          key={item.id}
          id={item.id}
          title={item.title}
          link={`/movie/${item.id}`}
          imdbPoint={item.vote_average}
          dropPath={item.backdrop_path}
          posterPath={item.poster_path}
        />
      );
    });

    return <SetupCarousel>{list}</SetupCarousel>;
  };

  const listTrailer = (results) => {
    if (results.length === 0)
      return (
        <Col>
          <p>Trailer sẽ được cập nhật sớm nhất.</p>
        </Col>
      );

    return results.slice(0, 4).map((item) => (
      <Col key={item.id} xs={24} sm={12} md={8} xl={6} span={6}>
        <TrailerIframe keyId={item.key} />
      </Col>
    ));
  };

  const listCast = cast
    .filter((item) => item.profile_path !== null)
    .slice(0, 12)
    .map((item) => (
      <CardCast
        key={item.id}
        pathImg={item.profile_path}
        id={item.id}
        name={item.name}
        character={item.character}
      />
    ));

  return (
    <>
      {contextHolder}
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div>
        <MovieDetailImage
          pathImg={movie.backdrop_path}
          posterImg={movie.poster_path}
          id={movie.id}
          title={movie.title}
          subtitle={movie.original_title}
          priority={true}
          openNotification={openNotification}
        />
        <MovieList category="Thông tin phim">
          <MovieInfo
            year={movie.release_date}
            genres={movie.genres}
            country={movie.production_countries}
            editor={editor}
            score={movie.vote_average}
            time={movie.runtime}
          >
            {listCast}
          </MovieInfo>
        </MovieList>

        <MovieList category="Nội dung phim">
          <p>
            <span style={{ fontWeight: "bold" }}>{movie.title}</span>.{" "}
            {getOverview(movie.overview)}
          </p>
        </MovieList>
        <MovieList category="Trailer">
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {listTrailer(results)}
          </Row>
        </MovieList>
        <MovieList category="Phim tương tự">
          {listSimilar(similarResults)}
        </MovieList>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { movieId } = query;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_MOVIE;
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=vi`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=vi`;
  const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=vi`;
  const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  const [movieRes, creditsRes, similarRes, trailerRes, imagesRes] =
    await Promise.all([
      fetch(movieUrl),
      fetch(creditsUrl),
      fetch(similarUrl),
      fetch(trailerUrl),
    ]);

  if (!movieRes.ok) {
    return {
      notFound: true, // Cho biết đường dẫn không tồn tại
    };
  }

  const [movie, credits, similar, trailer] = await Promise.all([
    movieRes.json(),
    creditsRes.json(),
    similarRes.json(),
    trailerRes.json(),
  ]);

  return {
    props: { movie, credits, similar, trailer },
  };
};

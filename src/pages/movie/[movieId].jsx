import CardCast from "@/component/CardCast";
import CardFilm from "@/component/CardFilm";
import MovieDetailImage from "@/component/MovieDetailImage";
import MovieInfo from "@/component/MovieInfo";
import MovieList from "@/component/MovieList";
import SetupCarousel from "@/component/SetupCarousel";
import TrailerIframe from "@/component/TrailerIframe";
import { getOverview } from "@/lib/common";
import { Col, Row, Space } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { Children } from "react";

export default function movieId({ movie, credits, similar, trailer }) {
  const { results } = trailer;
  const { cast, crew } = credits;
  const { results: similarResults } = similar;

  console.log(cast, crew);
  const editor = crew.filter((item) => {
    return item.job === "Editor";
  });

  const listSimilar = (results) => {
    if (results.length === 0) return <p>Chưa có đề xuất cho bạn.</p>;

    const list = results
      .filter((item, i) => item.backdrop_path || item.poster_path)
      .map((item) => {
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
    let list;
    if (results.length === 0)
      return (list = (
        <Col>
          <p>Trailer sẽ được cập nhật sớm nhất.</p>
        </Col>
      ));
    else
      list = results.map((item, i) => {
        if (i < 4) {
          return (
            <Col key={item.id} xs={24} sm={12} md={8} xl={6} span={6}>
              <TrailerIframe keyId={item.key} />
            </Col>
          );
        }
      });
    return list;
  };

  const listCast = cast.map((item, i) => {
    if (item.profile_path !== null) {
      if (i < 12)
        return (
          <CardCast
            key={item.id}
            pathImg={item.profile_path}
            id={item.id}
            name={item.name}
            character={item.character}
          />
        );
    }
  });

  console.log(movie);
  return (
    <>
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
        ></MovieDetailImage>
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

// export const getServerSideProps = async ({ query }) => {
//   // const { query } = ctx;
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${query.movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
//   );

//   `https://api.themoviedb.org/3/movie/${query.movieId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`;

//   if (!res.ok) {
//     return {
//       //   props: {}, //Nếu trả về notFound thì k cần props cũng đc!
//       notFound: true, // Cho biết đường dẫn không tồn tại
//     };
//   }
//   const movie = await res.json();

//   console.log(movie);
//   return {
//     props: { movie },
//   };
// };

export const getServerSideProps = async ({ query }) => {
  const [movieRes, creditsRes, similarRes, trailerRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${query.movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${query.movieId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${query.movieId}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${query.movieId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}`
    ),
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

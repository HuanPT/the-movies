import PersonInfo from "@/component/movies/PersonInfo";
import { getOverview } from "@/lib/common";
import { Col, Row } from "antd";
import Head from "next/head";
import React from "react";
import styles from "@/styles/PersonId.module.css";
import CardFilm from "@/component/cardFilm/CardFilm";
import Image from "next/image";
import { srcH632 } from "@/lib/api.service";

export default function PersonId({ person, movies, images }) {
  const { cast } = movies;

  const { profiles } = images;

  console.log(images);
  const listCast = cast
    .filter((item, i) => item.backdrop_path || (item.poster_path && i < 20))
    .map((item) => (
      <Col key={item.id} lg={6} sm={8} xs={12}>
        <CardFilm
          id={item.id}
          title={item.title}
          link={`/movie/${item.id}`}
          imdbPoint={item.vote_average}
          dropPath={item.backdrop_path}
          posterPath={item.poster_path}
        />
      </Col>
    ));

  const listImage = profiles.map((item, i) => {
    if (i < 12) {
      return (
        <Col key={i} lg={6} sm={8} xs={12}>
          <Image
            src={srcH632 + item.file_path}
            width={300}
            height={450}
            alt={person.name}
          />
        </Col>
      );
    }
  });

  return (
    <>
      <Head>
        <title>{person.name}</title>
      </Head>

      <Row>
        <Col md={8} xs={24}>
          <div className={styles.wrap}>
            <PersonInfo
              name={person.name}
              birthday={person.birthday}
              profilePath={person.profile_path}
              gender={person.gender}
              placeBirth={person.place_of_birth}
            />
          </div>
        </Col>
        <Col md={16} xs={24}>
          <div className={styles.movie__participated}>
            <div className={styles.bio}>
              <h1>{person.name}</h1>
              <h3>Tiểu sử</h3>
              <p>{getOverview(person.biography)}</p>
            </div>
            <h3>Các phim đã tham gia</h3>
            <Row gutter={[10, 10]}>{listCast}</Row>

            <h3>Ảnh</h3>
            <Row gutter={[10, 10]}>{listImage}</Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { personId } = query;
  const [personRes, moviesRes, imagesRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
    ),
    fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
    ),
    fetch(
      `https://api.themoviedb.org/3/person/${personId}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}`
    ),
  ]);

  if (!personRes.ok) {
    return {
      notFound: true, // Cho biết đường dẫn không tồn tại
    };
  }

  const [person, movies, images] = await Promise.all([
    personRes.json(),
    moviesRes.json(),
    imagesRes.json(),
  ]);

  return {
    props: {
      person,
      movies,
      images,
    },
  };
};

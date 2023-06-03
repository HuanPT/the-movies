import { Col, Rate, Row } from "antd";
import React from "react";
import styles from "@/styles/WatchId.module.css";
import Head from "next/head";
import CardFilm from "@/component/CardFilm";
import MovieList from "@/component/MovieList";
import SetupCarousel from "@/component/SetupCarousel";
import { getOverview } from "@/lib/common";
import Comments from "@/component/comments/Comments";

export default function WatchId({ movie, recommend }) {
  const { results: recommendResults } = recommend;

  console.log(movie);

  const listRecommend = (results) => {
    if (results.length === 0) return <p>Chưa có đề xuất cho bạn.</p>;

    const list = results
      .filter((item) => item.backdrop_path || item.poster_path)
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

  const rate = movie.vote_average;

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div className={styles.container}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div className={styles.watch}>
              <iframe
                src="//ok.ru/videoembed/5136274950761"
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.wrapInfoMovie}>
              <Row gutter={[12, 24]}>
                <Col span={24}>
                  <h1 className={styles.title}>{movie.title}</h1>
                  <h2 className={styles.subTitle}>{movie.original_title}</h2>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBlock: 10,
                      }}
                    >
                      <h1>Điểm đánh giá</h1>{" "}
                      <Rate count={10} allowHalf disabled defaultValue={rate} />
                      <p>
                        (
                        {rate > 0
                          ? `${rate.toFixed(1)} điểm / ${
                              movie.vote_count
                            } lượt}`
                          : "Chưa có đánh giá"}{" "}
                        )
                      </p>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontWeight: 700 }}>{movie.title}.</span>{" "}
                    {getOverview(movie.overview)}
                  </div>
                </Col>
                <Col span={24}>
                  <Comments />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <MovieList category={"Có thể bạn cũng muốn xem"}>
          {listRecommend(recommendResults)}
        </MovieList>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const [movieRes, recommendRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${query.watchId}?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${query.watchId}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
    ),
  ]);

  if (!movieRes.ok) {
    return {
      notFound: true, // Cho biết đường dẫn không tồn tại
    };
  }

  const [movie, recommend] = await Promise.all([
    movieRes.json(),
    recommendRes.json(),
  ]);

  return {
    props: { movie, recommend },
  };
};

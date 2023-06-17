import { Col, Rate, Row } from "antd";
import { useAuthContext } from "@/context/Auth.context";
import { addMovieToField } from "@/lib/auth";
import React, { useEffect, useMemo } from "react";
import styles from "@/styles/WatchId.module.css";
import Head from "next/head";
import CardFilm from "@/component/cardFilm/CardFilm";
import MovieList from "@/component/movies/MovieList";
import SetupCarousel from "@/component/SetupCarousel";
import { getOverview } from "@/lib/common";
import Comments from "@/component/comments/Comments";

export default function WatchId({ movie, recommend }) {
  const { user, setUserData } = useAuthContext();
  const userId = useMemo(() => user?.uid, [user]);
  const movieId = movie.id;
  useEffect(() => {
    if (user) {
      addMovieToField(userId, movieId, "histories");
      setUserData((prevUserData) => ({
        ...prevUserData,
        histories: prevUserData.histories.find((item) => item == movieId)
          ? [...prevUserData.histories]
          : [...prevUserData.histories, movieId],
      }));
    }
  }, []);

  const { results: recommendResults } = recommend;
  // const id = movie.id;
  // console.log(useGetCommentsByIdQuery(id));

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
                  <Comments id={movie.id} />
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
  const { watchId } = query;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_MOVIE;
  const movieUrl = `https://api.themoviedb.org/3/movie/${watchId}?api_key=${apiKey}&language=vi`;
  const recommendUrl = `https://api.themoviedb.org/3/movie/${watchId}/recommendations?api_key=${apiKey}&language=vi`;

  const [movieRes, recommendRes] = await Promise.all([
    fetch(movieUrl),
    fetch(recommendUrl),
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

import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>theMovies - Trải nghiệm phim trực tuyến không giới hạn</title>
        <meta
          name="description"
          content="TheMovies - Mang cả thế giới đến với bạn!"
        />
      </Head>
      <h1>Đây là trang chủ</h1>
      <Link href="/account">Về chúng tôi</Link>
      <Link href="/movie">movieDetail</Link>
    </>
  );
}

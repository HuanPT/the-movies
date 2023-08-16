import "@fontsource/montserrat";
import "@/styles/globals.css";
import "@/styles/responsive.css";
import "@/styles/Antd.css";
import LayOut from "./_layout";
import { AuthProvider } from "@/context/Auth.context";
import { ConfigProvider } from "antd";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:url"
          content="https://the-movies-reactjs.vercel.app"
        />
        <meta property="og:type" content="movie" />
        <meta property="og:title" content="TheMovies" />
        <meta
          property="og:description"
          content="TheMovies - Mang cả thế giới giải trí đến với bạn! Trang web xem phim hàng đầu!"
        />
        <meta property="og:image" content="width:600px height:314px" />
      </Head>
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "'montserrat', sans-serif",
            },
          }}
        >
          <LayOut>
            <Component {...pageProps} />
          </LayOut>
        </ConfigProvider>
      </AuthProvider>
    </>
  );
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/public/faviconLogo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:url"
          content="https://the-movies-reactjs.vercel.app"
        />
        <meta property="og:type" content="movie" />
        <meta property="og:title" content="TheMovies" />
        <meta
          property="og:description"
          content="TheMovies - Mang cả thế giới giải trí đến với bạn!"
        />
        <meta property="og:image" content="width:600px height:314px" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

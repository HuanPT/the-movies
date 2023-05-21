export const genres = [
  { id: 28, name: "Phim Hành Động" },

  { id: 12, name: "Phim Phiêu Lưu" },

  { id: 16, name: "Phim Hoạt Hình" },

  { id: 35, name: "Phim Hài" },

  { id: 27, name: "Phim Kinh Dị" },

  { id: 878, name: "Phim Khoa Học Viễn Tưởng" },

  { id: 10751, name: "Phim Gia Đình" },

  { id: 14, name: "Phim Giả Tưởng" },

  { id: 36, name: "Phim Lịch Sử" },

  { id: 9648, name: "Phim Bí Ẩn" },
];

export const srcImgOriginal = "https://image.tmdb.org/t/p/original";

export const srcCardImg = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

export const srcCardSmall = "https://image.tmdb.org/t/p/w220_and_h330_face";

export const srcW300 = "https://image.tmdb.org/t/p/w300";

export const srcW533 = "https://image.tmdb.org/t/p/w533_and_h300_bestv2";

export const srcH632 = "https://image.tmdb.org/t/p/h632";

export const fetchMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

export const fetchGenres = async (genres) => {
  function randomNum() {
    return Math.floor(Math.random() * 3) + 1;
  }

  const promises = genres.map(async (genre) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.NEXT_PUBLIC_API_KEY_MOVIE
    }&with_genres=${genre.id}&language=vi&page=${randomNum()}`;
    const data = await fetchMovies(url);
    return { id: genre.id, name: genre.name, data };
  });

  const listGenres = await Promise.all(promises);
  return listGenres;
};




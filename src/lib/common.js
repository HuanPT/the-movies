import CardFilm from "@/component/cardFilm/CardFilm";
import { Col } from "antd";
import CryptoJS from "crypto-js";

export const cost = {
  vipMovie: 1000,
  vipMonth: 40000,
};

export function numberWithCommas(number, separator = ",") {
  if (!number) return;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function getOverview(overview) {
  if (!overview) return "Nội dung trống.";
  return overview;
}

export function numberTofixed(number) {
  return number > 0 ? number.toFixed(1) : "NR";
}

export function formatNumberToDateTime(dateTime) {
  const date = new Date(+dateTime);
  const formattedDate = `${date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;

  return formattedDate;
}

// Mã hóa
export const encryptData = (data) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
};

// Giải mã
export const decryptData = (data) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const decryptedData = CryptoJS.AES.decrypt(data, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return decryptedData;
};

// Convert to hh/mm
export const runtime = (time) => {
  return Math.floor(time / 60) + " giờ " + (time % 60) + " phút";
};

// formatString
export const formatString = (currentIndex, maxIndex) => {
  return currentIndex == maxIndex - 1 ? "" : ", ";
};

// Xử lý params thành URL params
export const handleParams = (params) => {
  console.log(params);
  let urlParams = "";
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      if (urlParams !== "") {
        urlParams += "&";
      }
      urlParams += `${encodeURIComponent(key)}=${encodeURIComponent(
        params[key]
      )}`;
    }
  }

  return urlParams;
};

export const dataMovies = async (arr) => {
  if (!Array.isArray(arr)) return [];

  // Hàm trung gian chuẩn hóa các tham số đầu vào thành 1 mảng duy nhất
  const normalizeIds = (input) => {
    return Array.isArray(input)
      ? input.map((item) => (typeof item === "number" ? item : item.id))
      : [input];
  };

  const ids = normalizeIds(arr);

  const promises = ids.map(async (id, index) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&language=vi`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch movie with ID ${id}`);
    }
    const data = await res.json();
    return { data, ...arr[index] };
  });

  const list = await Promise.all(promises);
  return list;
};

export const fetchData = async (option, setState, isBtnX = false) => {
  const datas = await dataMovies(option);
  const list = datas.map((data) => (
    <Col key={data.data.id} xs={12} sm={8} md={6} lg={4}>
      <CardFilm
        key={data.data.id}
        id={data.data.id}
        title={data.data.title}
        link={`/movie/${data.data.id}`}
        imdbPoint={data.data.vote_average}
        dropPath={data.data.backdrop_path}
        posterPath={data.data.poster_path}
        isClose={isBtnX}
      />
      {data.expirationTime && (
        <div>
          <p>Ngày thuê: {data.startTime}</p>
          <p>Ngày hết hạn: {data.expirationTime}</p>
        </div>
      )}
    </Col>
  ));
  setState(list);
};

export const handleTime = (number, id) => {
  const start = Date.now();
  const startTime = formatNumberToDateTime(start);
  const end = start + number * 24 * 60 * 60 * 1000;
  const expirationTime = formatNumberToDateTime(end);

  if (id) {
    return {
      id,
      start,
      end,
      startTime,
      expirationTime,
    };
  } else {
    const isVip = true;
    return {
      isVip,
      start,
      end,
      startTime,
      expirationTime,
    };
  }
};


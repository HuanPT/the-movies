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
    <Col key={data.data.id} xs={12} sm={8} md={6} lg={5}>
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

export const createUserData = (user, email, username) => {
  const date = user.metadata.createdAt;
  const createOnTime = formatNumberToDateTime(date);

  return {
    email,
    username,
    coins: 50000,
    histories: [],
    vipStatus: {
      end: 0,
      start: 0,
      isVip: false,
      startTime: "",
      expirationTime: "",
    },
    rentMovies: [],
    collections: [],
    createOnTime,
  };
};

const readGroup = (group) => {
  const readDigit = [
    " Không",
    " Một",
    " Hai",
    " Ba",
    " Bốn",
    " Năm",
    " Sáu",
    " Bảy",
    " Tám",
    " Chín",
  ];
  let temp = "";
  if (group == "000") return "";
  temp = readDigit[parseInt(group.substring(0, 1))] + " Trăm";
  if (group.substring(1, 2) == "0")
    if (group.substring(2, 3) == "0") return temp;
    else {
      temp += " Lẻ" + readDigit[parseInt(group.substring(2, 3))];
      return temp;
    }
  else temp += readDigit[parseInt(group.substring(1, 2))] + " Mươi";
  if (group.substring(2, 3) == "5") temp += " Lăm";
  else if (group.substring(2, 3) != "0")
    temp += readDigit[parseInt(group.substring(2, 3))];
  return temp;
};

export const convertCurrencyToWords = (number) => {
  if (number == null || number == "") return "";
  let num = number.toString();
  let temp = "";
  while (num.length < 18) {
    num = "0" + num;
  }
  const g1 = num.substring(0, 3);
  const g2 = num.substring(3, 6);
  const g3 = num.substring(6, 9);
  const g4 = num.substring(9, 12);
  const g5 = num.substring(12, 15);
  const g6 = num.substring(15, 18);
  if (g1 != "000") {
    temp = readGroup(g1);
    temp += " Triệu";
  }
  if (g2 != "000") {
    temp += readGroup(g2);
    temp += " Nghìn";
  }
  if (g3 != "000") {
    temp += readGroup(g3);
    temp += " Tỷ";
  } else if ("" != temp) {
    temp += " Tỷ";
  }
  if (g4 != "000") {
    temp += readGroup(g4);
    temp += " Triệu";
  }
  if (g5 != "000") {
    temp += readGroup(g5);
    temp += " Nghìn";
  }
  temp = temp + readGroup(g6);
  temp = temp.replaceAll("Một Mươi", "Mười");
  temp = temp.trim();
  temp = temp.replaceAll("Không Trăm", "");
  temp = temp.trim();
  temp = temp.replaceAll("Mười Không", "Mười");
  temp = temp.trim();
  temp = temp.replaceAll("Mươi Không", "Mươi");
  temp = temp.trim();
  if (temp.indexOf("Lẻ") == 0) temp = temp.substring(2);
  temp = temp.trim();
  temp = temp.replaceAll("Mươi Một", "Mươi Mốt");
  temp = temp.trim();
  const result =
    temp.substring(0, 1).toUpperCase() + temp.substring(1).toLowerCase();
  return (result == "" ? "Không" : result) + " đồng";
};

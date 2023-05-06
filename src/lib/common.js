import CryptoJS from "crypto-js";

export function numberWithCommas(number, separator = ".") {
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

export const cost = {
  "VipMovie": 1000,
  "VipMonth": 40000,
};

// export function CryptoUtil(secretKey) {
//   this.secretKey = secretKey;

//   this.encryptData = function (data) {
//     const encryptedData = CryptoJS.AES.encrypt(data, this.secretKey).toString();
//     return encryptedData;
//   };

//   this.decryptData = function (data) {
//     const decryptedData = CryptoJS.AES.decrypt(data, this.secretKey).toString(
//       CryptoJS.enc.Utf8
//     );
//     return decryptedData;
//   };
// }

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

// export function getCurrentTimePlusTenDays() {
//   // Tạo một đối tượng Date đại diện cho thời gian hiện tại
//   const now = new Date();

//   // Thêm 10 ngày vào giá trị của đối tượng Date
//   now.setDate(now.getDate() + 10);

//   // Chuyển đổi thời gian hiện tại + 10 ngày thành số nguyên và trả về kết quả
//   return Math.floor(now.getTime() / 1000);
// }

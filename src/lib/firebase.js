// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app =
  getApps().length == 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);

export const authErrors = {
  "auth/email-already-exists": "Email đã tồn tại",
  "auth/invalid-password": "Mật khẩu là bắt buộc",
  "auth/email-not-found": "Tài khoản hoặc mật khẩu không chính xác",
  "auth/user-not-found": "Tài khoản hoặc mật khẩu không chính xác",
  "auth/wrong-password": "Tài khoản hoặc mật khẩu không chính xác",
  "auth/missing-password": "Bạn chưa điền mật khẩu",
  "auth/invalid-email": "Email là bắt buộc",
  "auth/too-many-requests": "Vui lòng thử lại sau ít phút",
  "auth/email-already-in-use": "Email đã được sử dụng",
};

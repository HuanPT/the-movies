import { auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { formatNumberToDateTime } from "./common";

export const login = async (email, password) => {
  let user = null;
  let error = null;
  try {
    user = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { user, error };
};

export const register = async (email, password, username) => {
  let user = null;
  let error = null;
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    user = credential.user;
    await updateProfile(user, {
      displayName: username,
    });

    const userRef = collection(db, "users");

    const date = user.metadata.createdAt;

    const createOnTime = formatNumberToDateTime(date);

    await setDoc(
      doc(userRef, user.uid),
      {
        email,
        username,
        coins: 50000,
        histories: [],
        vipStatus: {
          end: 0,
          start: 0,
          isVip: false,
        },
        rentMovies: [],
        collections: [],
        createOnTime,
      },
      { merge: true }
    );

    user.reload();
  } catch (err) {
    error = err;
  }
  return { user, error };
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
    throw new Error("Đăng xuất thất bại!");
  }
};

export const changePassword = async (oldPass, newPass) => {
  const user = auth.currentUser;
  let error = null;

  if (user) {
    const email = user.email;
    const credentials = EmailAuthProvider.credential(email, oldPass);

    try {
      // Xác thực người dùng bằng mật khẩu cũ
      await reauthenticateWithCredential(user, credentials);

      // Thay đổi mật khẩu mới
      await updatePassword(user, newPass);

      console.log("Thay đổi mật khẩu thành công");
    } catch (err) {
      console.log("Thay đổi mật khẩu thất bại", err);
      error = err;
    }
  }
  return { error };
};

export const forgotPassword = async (email) => {
  let error = null;
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.log(err);
    error = err;
  }
  return { error };
};

const updateMovieField = (operation) => async (userId, movieId, fieldDoc) => {
  try {
    const userRef = doc(db, "users", userId);
    const updateObjField = {
      [fieldDoc]: operation(movieId),
    };
    await updateDoc(userRef, updateObjField);
  } catch (err) {
    console.log(err);
  }
};

export const addMovieToField = updateMovieField(arrayUnion);
export const removeMovieFromField = updateMovieField(arrayRemove);

export const removeAllMovieFromField = async (userId, fieldDoc) => {
  try {
    const userRef = doc(db, "users", userId);
    const updateObjField = {
      [fieldDoc]: [],
    };
    await updateDoc(userRef, updateObjField);
  } catch (err) {
    console.log(err);
  }
};

export const updateRentMovie = async (
  operation,
  userId,
  movieId,
  fieldDoc,
  number
) => {
  try {
    const userRef = doc(db, "users", userId);
    if (number) {
      const start = Date.now(); // Lấy thời gian hiện tại là số nguyên
      const end = new Date(currentDate + number * 24 * 60 * 60 * 1000); // Thêm số ngày vào số nguyên thời gian hiện tại
      const timeStart = formatNumberToDateTime(start);
      const expirationTime = formatNumberToDateTime(end);

      const updateObjField = {
        [fieldDoc]: operation({
          id: movieId,
          start,
          end,
          timeStart,
          expirationTime,
        }),
      };
      await updateDoc(userRef, updateObjField);
    } else {
      const updateObjField = {
        [fieldDoc]: operation(movieId),
      };
      await updateDoc(userRef, updateObjField);
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateField = async (userId, coins, fieldDoc) => {
  try {
    const userRef = doc(db, "users", userId);
    const updateObjField = {
      [fieldDoc]: coins,
    };
    await updateDoc(userRef, updateObjField);
  } catch (err) {
    console.log(err);
  }
};

export const autoRemoveMovieRent = async (userId, movie, fieldDoc) => {
  try {
    const userRef = doc(db, "users", userId);
    const updateObjField = {
      [fieldDoc]: arrayRemove(movie),
    };
    await updateDoc(userRef, updateObjField);
  } catch (err) {
    console.log(err);
  }
};

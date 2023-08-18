import { auth, db, googleProvider, storage } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserData, formatNumberToDateTime } from "./common";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const login = async (email, password) => {
  let user = null;
  let error = null;
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    user = credential.user;
  } catch (e) {
    error = e;
  }
  return { user, error };
};

export const signInWithGoogle = async () => {
  let user = null;
  let error = null;
  try {
    const credential = await signInWithPopup(auth, googleProvider);
    user = credential.user;

    const userRef = collection(db, "users");
    const userSnap = await getDoc(doc(userRef, user.uid));
    if (!userSnap.exists()) {
      const createUser = createUserData(user, user.email, user.displayName);
      await setDoc(doc(userRef, user.uid), createUser, { merge: true });
    }
  } catch (err) {
    error = err;
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

    const createUser = createUserData(user, email, username);
    // await sendEmailVerification(user);
    await setDoc(doc(userRef, user.uid), createUser, { merge: true });
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

export const updateField = async (userId, fieldValue, fieldDoc) => {
  try {
    const userRef = doc(db, "users", userId);
    const updateObjField = {
      [fieldDoc]: fieldValue,
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

export const updateAvatar = async (image, userId, setUrl) => {
  try {
    const imageRef = ref(storage, userId);
    await uploadBytes(imageRef, image);

    const url = await getDownloadURL(imageRef);
    setUrl(url);
    updateField(userId, url, "avatar");
  } catch (error) {
    console.log(error);
  }
};

import { auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import {  formatNumberToDateTime } from "./common";

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
        collection: [],
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

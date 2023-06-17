import { auth, db } from "./firebase";
import {
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const getCommentsById = async (id) => {
  let data = [];
  // try {
  //   const querySnapshot = await getDocs(collection(db, "comments"));
  //   querySnapshot.docs
  //     .filter((doc) => doc.id == id)
  //     .map((doc) => (data = doc.data().comments));

  //   console.log(data);
  // } catch (err) {
  //   error = err;
  // }
  // const querySnapshot = await getDocs(collection(db, "comments"));
  // querySnapshot.docs
  //   .filter((doc) => doc.id == id)
  //   .map((doc) => (data = doc.data().comments));

  const docRef = doc(db, "comments/" + id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    data = docSnap.data().comments;
  }
  return data;
};

export const postCommentById = async (newComment, id) => {
  try {
    const commentsRef = doc(db, "comments/" + id);

    const docSnap = await getDoc(commentsRef);
    if (docSnap.exists()) {
      await updateDoc(commentsRef, {
        comments: arrayUnion(newComment),
      });
    } else {
      const commentRef = collection(db, "comments");

      await setDoc(doc(commentRef, String(id)), {
        comments: [newComment],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

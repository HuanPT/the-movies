import { db } from "./firebase";
import {
  getDoc,
  setDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const getCommentsById = async (id) => {
  let data = [];

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

export const updateCommentById = async (id, newComment) => {
  try {
    const commentsRef = doc(db, "comments/" + id);
    await updateDoc(commentsRef, {
      comments: newComment,
    });
  } catch (err) {
    console.log(err);
  }
};

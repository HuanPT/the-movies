import { fakeBaseQuery } from "@reduxjs/toolkit/dist/query";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import { db, auth } from "@/lib/firebase";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getCommentsById: builder.query({
      async queryFn( id ) {
        console.log("id: ", id);
        try {
          let comments = [];
          const commentsRef = collection(db, "comments",id);
          console.log("comments: ", commentsRef);
          const querySnapShot = await getDocs(commentsRef);
          console.log("querySnapShot: ", querySnapShot);
          querySnapShot?.forEach((doc) => {
            console.log(doc.data());
            const comment = doc.data();
            comments.push(comment);
          });
          // console.log("comments: ", comments);
          console.log(comments);

          // const q = query(collection(db, "comments"), where(id, "==", "true"));
          // const querySnapShot = await getDocs(q);
          // querySnapShot?.forEach((doc) => {
          //   console.log(doc.id, "==>", doc.data());
          //   const comment = doc.data();
          //   comments.push(comment);
          // });
          return { data: comments };
        } catch (err) {
          console.log(err);
          return { error: err };
        }
      },
      providesTags: ["Comments"],
    }),
    postComment: builder.mutation({
      async queryFn(id, data) {
        try {
          const commentRef = await addDoc(collection(db, "comments", id), data);
          const newComment = { ...data, id: commentRef.id };

          return { data: newComment };
        } catch (err) {
          return { error: err };
        }
      },
    }),
    deleteComment: builder.mutation({
      async queryFn(id, commentId) {
        try {
          await deleteDoc(doc(db, "comments", id), data.id === commentId);
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const {
  useGetCommentsByIdQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;

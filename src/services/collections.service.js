import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db, auth } from "@/lib/firebase";
// import {listHistories} from ""

export const collectionsApi = createApi({
  reducerPath: "collectionsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Collections"],
  endpoints: (builder) => ({
    fetchCollections: builder.query({
      async queryFn() {
        try {

        } catch (err) {
          return {
            error: err,
          };
        }
      },
      providesTags: ["collections"],
    }),
    addCollection: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, "collections"), {
            data,
          });
        } catch (err) {
          return {
            error: err,
          };
        }
      },
      invalidatesTags: ["Collections"],
    }),
    removeCollection: builder.mutation({
      async queryFn(data) {}
    })
  }),
});

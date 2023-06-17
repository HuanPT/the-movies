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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUser: builder.query({
      
    }),
  }),
});


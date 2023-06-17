import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import commentReducer from "./comment.slice";
import { commentsApi } from "@/services/comments.service";

export const store = configureStore({
  reducer: {
    [commentsApi.reducerPath]: commentsApi.reducer,
    user: userReducer,
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commentsApi.middleware),
});

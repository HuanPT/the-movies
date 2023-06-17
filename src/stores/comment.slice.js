import { commentsApi } from "@/services/comments.service";
import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      commentsApi.endpoints.getCommentsById.matchFulfilled,
      (state, { payload }) => {
        state.comments = payload || [];
      }
    );
    builder.addMatcher(
      commentsApi.endpoints.postComment.matchFulfilled,
      (state, { payload }) => {
        state.comments.push(payload);
      }
    );
  },
});

export const selectComment = (state) => state.comments;

// tag selector
export default commentSlice.reducer;

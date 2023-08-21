import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  articleInfo: [
    {
      articleId: "",
      articleName: "",
    },
  ],
};

export const ArticleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    addArticle: (state, action) => {
      state.articleInfo.push(action.payload);
    },
  },
});

export default ArticleSlice.reducer;
export const { addArticle } = ArticleSlice.actions;

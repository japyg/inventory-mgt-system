import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  articleInfo: [
    {
      articleId: "",
      articleName: "",
    },
  ],
};

//Generated pending, fulfilled and rejected action types
export const fetchArticles = createAsyncThunk(
  "/articles/fetchArticles",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getArticles");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const ArticleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    addArticle: (state, action) => {
      state.articleInfo.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articleInfo = action.payload;
      state.error = "";
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.articleInfo = [];
      state.error = action.error.message;
    });
  },
});

export default ArticleSlice.reducer;
export const { addArticle } = ArticleSlice.actions;

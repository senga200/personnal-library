import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  fetchedBooks: [],
  error: null,
};

const searchBooksSlice = createSlice({
  name: "searchBooks",
  initialState,

  reducers: {
    searchBooks(state, action) {
      console.log("state", state);
      state.fetchedBooks = action.payload;
      //state.fetchedBooks.push(action.payload.items);
      // localStorage.setItem("fetchedBooks", JSON.stringify(state.fetchedBooks));

      console.log("searchBooksSuccess");
      console.log("fetchedBooks", state.fetchedBooks);
      state.isLoading = false;
    },
    searchBooksLoading(state, action) {
      state.isLoading = true;
    },
    searchBooksFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { searchBooks, searchBooksLoading, searchBooksFailure } =
  searchBooksSlice.actions;
export default searchBooksSlice.reducer;

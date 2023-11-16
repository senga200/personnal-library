import { createSlice } from "@reduxjs/toolkit";

const booksList = JSON.parse(localStorage.getItem("booksList")) || [];
let id = 0;

const initialState = {
  books: booksList || [
    {
      id: id++,
      title: "Hamlet",
      author: "William Shakespeare",
      // pages: 1178,
      // currentPage: 0,
      read: false,
    },
  ],
  error: null,
};

localStorage.setItem("booksList", JSON.stringify(initialState.books));

const addBookSlice = createSlice({
  name: "addBook",
  initialState,

  reducers: {
    addBook(state, action) {
      state.books.push(action.payload);
      localStorage.setItem("booksList", JSON.stringify(state.books));
      console.log("addBook action", state.books);
    },
    addBookFailure(state, action) {
      state.error = action.payload;
    },
    deleteBook(state, action) {
      state.books = state.books.filter((book) => book.id !== action.payload);
      localStorage.setItem("booksList", JSON.stringify(state.books));
    },
    deleteBookFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { addBook, addBookFailure, deleteBook, deleteBookFailure } =
  addBookSlice.actions;
export default addBookSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const booksList = JSON.parse(localStorage.getItem("booksList")) || [];
let id = 0;

const initialState = {
  books: booksList || [
    {
      id: id++,
      title: "Hamlet",
      author: "William Shakespeare",
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
      // localStorage.setItem("booksList", JSON.stringify(state.books));
      console.log("addBook action", state.books);
    },

    addBookFromAPI(state, action) {
      // Vérifier si action.payload.volumeInfo existe avant de le déstructurer
      const { id, volumeInfo } = action.payload || {};

      if (!volumeInfo || !id) {
        console.error("Volume info is missing in the payload");
        return;
      }
      // Destructure title et authors de volumeInfo
      const { title, authors } = volumeInfo;
      const author =
        authors && authors.length > 0 ? authors[0] : "Unknown Author";

      const bookToAdd = {
        id,
        title,
        author,
        read: false,
      };

      const bookExists = state.books.find(
        (book) =>
          book.title === bookToAdd.title && book.author === bookToAdd.author
      );

      if (!bookExists) {
        state.books.push(bookToAdd);
        state.id = action.payload.id;
        localStorage.setItem("booksList", JSON.stringify(state.books));
        console.log("id from addBookFromAPI", state.id);
      }
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

export const {
  addBook,
  addBookFromAPI,
  addBookFailure,
  deleteBook,
  deleteBookFailure,
} = addBookSlice.actions;
export default addBookSlice.reducer;

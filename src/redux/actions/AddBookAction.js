import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const booksList = JSON.parse(localStorage.getItem("booksList")) || [];
let id = 0;

const initialState = {
  books: booksList || [],
  id: id,
  error: null,
};

localStorage.setItem("booksList", JSON.stringify(initialState.books));

const addBookSlice = createSlice({
  name: "addBook",
  initialState,

  reducers: {
    // addBook(state, action) {
    //   state.books.push(action.payload);
    //   console.log("addBook action", state.books);
    // },

    addBookFromAPI(state, action) {
      const id = action.payload.id;
      const volumeInfo = action.payload.volumeInfo;

      if (!volumeInfo || !id) {
        console.error("error payload VolumeInfo");
        return;
      }
      const bookToAdd = {
        id: id,
        title: volumeInfo.title || "",
        author: volumeInfo.authors[0] || "",
      };
      const bookExists = state.books.find(
        (book) =>
          book.title === bookToAdd.title && book.author === bookToAdd.author
      );
      if (!bookExists) {
        state.books.push(bookToAdd);
        state.id = action.payload.id;
        localStorage.setItem("booksList", JSON.stringify(state.books));
      }
    },

    addBookToFirebase(state, action) {
      try {
        const booksCollection = collection(db, "books");

        const bookObject = {
          title: action.payload.volumeInfo.title || "",
          author: action.payload.volumeInfo.authors[0] || "",
        };

        addDoc(booksCollection, bookObject);
      } catch (error) {
        console.error("error addBook in firebase", error);
        throw error;
      }
    },

    addBookFailure(state, action) {
      state.error = action.payload;
    },
    deleteBook(state, action) {
      state.books = state.books.filter((book) => book.id !== action.payload);
      localStorage.setItem("booksList", JSON.stringify(state.books));
    },
    deleteBookFromFirebase(state, action) {
      try {
        const bookDoc = doc(db, "books", action.payload);
        deleteDoc(bookDoc);
      } catch (error) {
        console.error("Error deleteBook From Firebase", error);
        throw error;
      }
    },
    deleteBookFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  addBook,
  addBookFromAPI,
  addBookToFirebase,
  addBookFailure,
  deleteBook,
  deleteBookFromFirebase,
  deleteBookFailure,
} = addBookSlice.actions;
export default addBookSlice.reducer;

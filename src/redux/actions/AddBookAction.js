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
      const title = action.payload.title;
      const overview = action.payload.overview;

      if (!title || !id) {
        console.error("error payload ");
        return;
      }
      const bookToAdd = {
        id: id,
        title: title || "",
        description: overview || "",
      };
      // const bookExists = state.books.find(
      //   (book) =>
      //     book.title === bookToAdd.title && book.author === bookToAdd.author
      // );
      const bookExists = state.books.find(
        (book) => book.title === bookToAdd.title
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
          title: action.payload.title || "",
          author: action.payload.overview[0] || "",
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

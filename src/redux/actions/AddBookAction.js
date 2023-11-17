import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

//const booksList = JSON.parse(localStorage.getItem("booksList")) || [];
let id = 0;

const initialState = {
  books: [],
  id: id,
  error: null,
};

// books: booksList || [
//   {
//     id: id++,
//     title: "Hamlet",
//     author: "William Shakespeare",
//     // read: false,
//   },
// ],
// error: null,
// };

//localStorage.setItem("booksList", JSON.stringify(initialState.books));

const addBookSlice = createSlice({
  name: "addBook",
  initialState,

  reducers: {
    // addBook(state, action) {
    //   state.books.push(action.payload);
    //   // localStorage.setItem("booksList", JSON.stringify(state.books));
    //   console.log("addBook action", state.books);
    // },

    addBookFromAPI(state, action) {
      // Vérifier si action.payload.volumeInfo existe
      const id = action.payload.id;
      const volumeInfo = action.payload.volumeInfo;

      if (!volumeInfo || !id) {
        console.error("Volume info is missing in the payload");
        return;
      }
      const bookToAdd = {
        id: id,
        title: volumeInfo.title || "",
        author: volumeInfo.authors[0] || "",
        // read: false,
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

    addBookToFirebase(state, action) {
      try {
        const booksCollection = collection(db, "books");

        const bookObject = {
          title: action.payload.volumeInfo.title || "",
          author: action.payload.volumeInfo.authors[0] || "",
        };

        addDoc(booksCollection, bookObject);
        console.log(
          "Livre ajouté avec succès à la base de données Firebase",
          bookObject
        );
      } catch (error) {
        console.error(
          "Erreur lors de l'ajout du livre à la base de données Firebase",
          error
        );
        throw error;
      }
    },

    addBookFailure(state, action) {
      state.error = action.payload;
    },
    deleteBook(state, action) {
      state.books = state.books.filter((book) => book.id !== action.payload);
      //localStorage.setItem("booksList", JSON.stringify(state.books));
    },
    deleteBookFromFirebase(state, action) {
      try {
        const bookDoc = doc(db, "books", action.payload);

        deleteDoc(bookDoc);
        console.log(
          "Livre supprimé avec succès de la base de données Firebase",
          action.payload
        );
      } catch (error) {
        console.error(
          "Erreur lors de la suppression du livre de la base de données Firebase",
          error
        );
        throw error;
      }
    },

    deleteBookFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  //addBook,
  addBookFromAPI,
  addBookToFirebase,
  addBookFailure,
  deleteBook,
  deleteBookFromFirebase,
  deleteBookFailure,
} = addBookSlice.actions;
export default addBookSlice.reducer;

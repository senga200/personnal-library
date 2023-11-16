import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import AddBookSlice from "./redux/actions/AddBookAction";
import SearchBookSlice from "./redux/actions/SearchBookAction";

const store = configureStore({
  reducer: {
    addBook: AddBookSlice,
    searchBooks: SearchBookSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

console.log("index's store", store.getState());

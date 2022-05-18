import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.scss";

import userSlice from "./redux/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { getUsers } from "./redux/actions/users.actions";
import { getPosts } from "./redux/actions/post.actions";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

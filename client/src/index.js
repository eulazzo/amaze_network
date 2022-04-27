import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Routers from "./components/Routes";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Routers>
    <App />
  </Routers>
);

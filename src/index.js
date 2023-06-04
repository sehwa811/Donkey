import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import { UserProvider } from "./contexts/usercontext";

import './index.styles.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);

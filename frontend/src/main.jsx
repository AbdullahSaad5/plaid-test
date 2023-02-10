import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AccessTokenProvider from "./context/AccessTokenContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccessTokenProvider>
      <Router>
        <App />
      </Router>
    </AccessTokenProvider>
  </React.StrictMode>
);

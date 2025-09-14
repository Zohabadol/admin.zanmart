import "./index.css";
import { App } from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { DeleteModalProvider } from "./context/DeleteModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DeleteModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DeleteModalProvider>
  </React.StrictMode>
);

reportWebVitals();

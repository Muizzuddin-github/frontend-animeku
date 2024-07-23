import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./hooks/ContextProvider.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <SkeletonTheme baseColor="#c4c2c2" highlightColor="#d6d4d4">
        <App />
      </SkeletonTheme>
    </ContextProvider>
  </React.StrictMode>
);

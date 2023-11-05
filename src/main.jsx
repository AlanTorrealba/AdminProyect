import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {NextUIProvider} from "@nextui-org/react";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <NextUIProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);

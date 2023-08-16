import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/auth-context";
import { SnackbarProvider } from "notistack";
import reportWebVitals from "./reportWebVitals";

import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <AuthProvider>
        <CssBaseline />
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

reportWebVitals();

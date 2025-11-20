import React, { StrictMode } from "react"; // StrictMode helps catch errors.
import { createRoot } from "react-dom/client"; // createRoot starts the React app.
import { BrowserRouter } from "react-router-dom"; // BrowserRouter is for navigation (URLs, pages).

import "./index.css";
import App from "./App.jsx";
import { TableProvider } from "./context/TableContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <TableProvider>
      <App />
    </TableProvider>
    {/* App inside because context must wrap around components that need its data. */}
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// This finds the "root" div in your index.html and injects our Material UI App into it.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
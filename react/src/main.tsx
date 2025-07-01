import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import routesLink from "./routesLink";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routesLink} />
  </StrictMode>
);

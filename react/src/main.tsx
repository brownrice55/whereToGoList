import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import routesLink from "./routes/routesLink";
import { DataProvider } from "./contexts/DataProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider>
      <RouterProvider router={routesLink} />
    </DataProvider>
  </StrictMode>
);

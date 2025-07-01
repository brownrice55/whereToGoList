import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Category from "./pages/Category";

const routesLink = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Home tabIndex={0} />} />
      <Route path="/map" element={<Home tabIndex={1} />} />
      <Route path="/add" element={<Settings tabIndex={0} />} />
      <Route path="/edit" element={<Settings tabIndex={1} />} />
      <Route path="/category" element={<Category />} />
    </Route>
  )
);

export default routesLink;

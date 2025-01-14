import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Dashboard from "../Layouts/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Root /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default router;

import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Dashboard from "../Layouts/Dashboard";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import SignUp from "../Pages/Forms/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
        { path: "/", element: <Home /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "*", element: <ErrorPage /> },
    ],
  },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default router;

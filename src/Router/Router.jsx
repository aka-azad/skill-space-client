import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Dashboard from "../Layouts/Dashboard";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import SignUp from "../Pages/Forms/SignUp";
import SignIn from "../Pages/Forms/SignIn";
import ApplyForTeaching from "../Pages/Forms/ApplyForTeaching";
import ClassForm from "../Pages/Forms/ClassForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/teach-on-skill-space", element: <ApplyForTeaching /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/add-class",
        element: <ClassForm />,
      },
    ],
  },
]);

export default router;

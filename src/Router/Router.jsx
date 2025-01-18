import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Dashboard from "../Layouts/Dashboard";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import SignUp from "../Pages/Forms/SignUp";
import SignIn from "../Pages/Forms/SignIn";
import ApplyForTeaching from "../Pages/Forms/ApplyForTeaching";
import ClassForm from "../Pages/Forms/ClassForm";
import AdminClassReview from "../Pages/AdminClassReview";
import Profile from "../Pages/Profile";
import TeachersApplications from "../Pages/TeachersApplications";
import UsersManagement from "../Pages/UsersManagement";
import AllClasses from "../Pages/AllClasses";
import ClassDetails from "../Pages/ClassDetails";
import Payment from "../Pages/Payment";
import EnrolledClasses from "../Pages/EnrolledClasses";
import EnrolledClassDetails from "../Pages/EnrolledClassDetails";
import MyClass from "../Pages/MyClassesForTeachers";
import MyClassDetails from "../Pages/MyClassDetails";
import ClassProgress from "../Pages/ClassProgress";
import PrivateRoute from "./PrivateRoute";
import RedirectHomeRoute from "./RedirectHomeRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-classes", element: <AllClasses /> },
      { path: "/class-details/:id", element: <PrivateRoute><ClassDetails /></PrivateRoute> },
      { path: "/make-payments/:id", element: <Payment /> },
      {
        path: "signup",
        element: (
          <RedirectHomeRoute>
            <SignUp />
          </RedirectHomeRoute>
        ),
      },
      {
        path: "sign-in",
        element: (
          <RedirectHomeRoute>
            <SignIn />
          </RedirectHomeRoute>
        ),
      },
      {
        path: "teach-on-skill-space",
        element: (
          <PrivateRoute>
            <ApplyForTeaching />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-class",
        element: <ClassForm />,
      },
      {
        path: "all-classes",
        element: <AdminClassReview />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "users",
        element: <UsersManagement />,
      },
      {
        path: "my-class",
        element: <MyClass />,
      },
      {
        path: "my-class/details/:id",
        element: <MyClassDetails />,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses />,
      },
      {
        path: "teachers-applications",
        element: <TeachersApplications />,
      },
      {
        path: "class/:id",
        element: <EnrolledClassDetails />,
      },
      {
        path: "class-progress/:id",
        element: <ClassProgress />,
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;

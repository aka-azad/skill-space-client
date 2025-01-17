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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-classes", element: <AllClasses /> },
      { path: "/class-details/:id", element: <ClassDetails /> },
      { path: "/make-payments/:id", element: <Payment /> },
      { path: "signup", element: <SignUp /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "teach-on-skill-space", element: <ApplyForTeaching /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
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
    ],
  },
]);

export default router;

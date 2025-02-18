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
import DashboardWelcomePage from "../Pages/DashboardWelcomePage";
import TeacherRoute from "./RouteForTeacher";
import AdminRoute from "./RouteForAdmin";
import StudentRoute from "./RouteForStudent";
import PopularClasses from "../Pages/PopularClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-classes", element: <AllClasses /> },
      { path: "/popular-classes", element: <PopularClasses /> },
      {
        path: "/class-details/:id",
        element: (
            <ClassDetails />
        ),
      },
      {
        path: "/make-payments/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
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
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardWelcomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-class",
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <ClassForm />
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-classes",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminClassReview />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UsersManagement />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-class",
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <MyClass />
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-class/details/:id",
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <MyClassDetails />
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "enrolled-classes",
        element: (
          <PrivateRoute>
            <StudentRoute>
              <EnrolledClasses />
            </StudentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "teachers-applications",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <TeachersApplications />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "class/:id",
        element: (
          <PrivateRoute>
            {" "}
            <StudentRoute>
              <EnrolledClassDetails />
            </StudentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "class-progress/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ClassProgress />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;

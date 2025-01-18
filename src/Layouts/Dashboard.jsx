import { NavLink, Outlet } from "react-router";
import { FaBars } from "react-icons/fa";
import logo from "../assets/logo-big.png";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { signOutUser, user } = useContext(AuthContext);

  const linksForAdmin = (
    <>
      <li>
        <NavLink
          to="/dashboard/users"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/teachers-applications"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          Teachers Applications
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/all-classes"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          All Courses
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/enrolled-classes"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          Enrolled Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/add-class"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          Add class
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-class"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          My Class
        </NavLink>
      </li>
    </>
  );

  const linksForStudent = (
    <>
      <li>
        <NavLink
          to="/dashboard/enrolled-classes"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          Enrolled Classes
        </NavLink>
      </li>
    </>
  );

  const linksForTeacher = (
    <>
      <li>
        <NavLink
          to="/dashboard/enrolled-classes"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          Enrolled Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/add-class"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          Add class
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-class"
          className="block hover:bg-gray-600 p-2 rounded"
        >
          My Class
        </NavLink>
      </li>
    </>
  );

  const renderLinks = () => {
    if (user?.authorization == "admin") {
      return linksForAdmin;
    }
    if (!user?.authorization) {
      if (user.role == "student") {
        return linksForStudent;
      }
      if (user.role == "teacher") {
        return linksForTeacher;
      }
    }
  };

  return (
    <>
    <Helmet>
      <title>Skill Space | Dashboard</title>
      <meta name="description" content="Dashboard"/>
    </Helmet>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="text-xl flex justify-between items-center font-bold hover:bg-neutral bg-accent bg-opacity-90 text-base-content">
            <div className="flex items-center my-2">
              <img className="h-7 w-7 mr-2 ml-6" src={logo} alt="Logo" />
              <p>
                Skill<span className=""> Space</span>
              </p>
            </div>
            <label
              htmlFor="my-drawer-2"
              className="btn w-fit my-2 mr-2 btn-primary drawer-button lg:hidden"
              style={{
                position: "sticky",
                top: 0,
                right: 0,
                marginLeft: "auto",
              }}
            >
              <FaBars />
            </label>
          </div>
          <div className="flex-1 p-4 w-full">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <NavLink to="/" className="block hover:bg-gray-600 p-2 rounded">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className="block hover:bg-gray-600 p-2 rounded"
              >
                Profile
              </NavLink>
            </li>
            {renderLinks()}
            <li>
              <button
                onClick={signOutUser}
                className="block hover:bg-gray-600 p-2 rounded"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

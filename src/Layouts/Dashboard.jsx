import { NavLink, Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <aside className="bg-gray-700 text-white w-64 p-4">
    <nav>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard"
            className="block hover:bg-gray-600 p-2 rounded"
          >
            Dashboard
          </NavLink>
        </li>
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
            to="/dashboard/profile"
            className="block hover:bg-gray-600 p-2 rounded"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/add-class"
            className="block hover:bg-gray-600 p-2 rounded"
          >
            add class
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Dashboard;

import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link, NavLink, useLocation } from "react-router";
import ThemeToggler from "./ThemeToggler";
import logo from "../assets/logo-big.png";
import SmallLottieLoader from "./SmallLottieLoader";

const RootNavbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const location = useLocation();

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-classes"}>All Classes</NavLink>
      </li>
      <li>
        <NavLink to={"/popular-classes"}>Popular Classes</NavLink>
      </li>
    </>
  );
  const privateLinks = (
    <>
      <li>
        <NavLink to={"/teach-on-skill-space"}>Teach on Skill Space</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/profile"}>Profile</NavLink>
      </li>
    </>
  );

  return (
    <div className=" bg-neutral bg-opacity-50 backdrop-blur-lg border-b-2  mb-3 shadow-lg sticky top-0 z-50">
      <div className="navbar max-w-[1280px] sm:w-full px-2 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost px-0 pr-1 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
              {user && user?.role == "student" && privateLinks}
            </ul>
          </div>
          <button className="btn btn-ghost text-xl  font-bold hover:bg-neutral bg-accent bg-opacity-90 text-base-content">
            <img className="h-7 w-7" src={logo} />
            Skill
            <span className=""> Space</span>
          </button>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
            {user && privateLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <ThemeToggler />
          {loading ? (
            <>
              <SmallLottieLoader />
            </>
          ) : user ? (
            <>
              <div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img alt={user.displayName} src={user.photoURL} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                  >
                    <li className=" *:hover:bg-transparent">
                      <p>{user.displayName}</p>
                    </li>
                    <li>
                      <Link to={"/dashboard/profile"}>Dashboard</Link>
                    </li>

                    <li>
                      <button onClick={signOutUser} className=" block">
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : location.pathname === "/sign-in" ? (
            <Link
              to={"/signup"}
              className="btn ml-3 btn-outline border-2 text-base text-white "
            >
              Signup
            </Link>
          ) : (
            <Link
              to={"/sign-in"}
              className="btn ml-3 btn-outline border-2 text-base text-white "
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RootNavbar;

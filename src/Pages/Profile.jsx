import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="mx-auto ">
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
        <img
          src="https://marketplace.canva.com/EAECJXaRRew/3/0/1600w/canva-do-what-is-right-starry-sky-facebook-cover-4SpKW5MtQl4.jpg"
          alt="Cover"
          className="w-full h-full object-cover object-top opacity-60"
        />
      </div>

      <div className=" text-left  p-6 relative ">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="User"
          className="w-32 h-32 -mt-20 object-cover rounded-full border-4 border-white"
        />

        <h2 className="text-2xl font-bold my-4">
          User Name: {user?.displayName || "User Name"}
        </h2>
        <p className="my-2">@{user?.email?.split("@")[0] || "username"}</p>

        <span
          className={`my-2 px-4 py-1 text-sm font-semibold rounded-full bg-blue-500 text-white`}
        >
          
          Role:{" "}
          {user?.role
            ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
            : "Student"}
        </span>

        <div className="mt-2 text-left  space-y-2">
          {user?.authorization === "admin" && (
            <p className="text-sm w-fit bg-red-100 px-4 py-1 rounded-md text-red-600 font-semibold">
              🔑 Admin Access
            </p>
          )}
          <p>
            <strong>Email:</strong> {user?.email || "Email Not Available"}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

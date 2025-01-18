import { useContext } from "react";
import SectionTitle from "../Components/SectionTitle";
import AuthContext from "../Context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-4">
      {user && (
        <SectionTitle title={user?.displayName} subtitle={"Welcome Back"} />
      )}
      <div className="bg-primary bg-opacity-15 text-base p-4 shadow rounded flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="user"
          className="w-32 h-32 object-cover rounded-full mb-4"
        />
        <h3 className="text-xl font-bold mb-2">
          {user?.displayName || "user Name"}
        </h3>
        <p className=" mb-2">
          <strong>Role:</strong> {user?.role || "Student"}
        </p>
        {user?.authorization === "admin" && (
          <p className=" mb-2">
            <strong>Authorization: </strong> Admin
          </p>
        )}
        <p className=" mb-2">
          <strong>Email:</strong> {user?.email || "Email"}
        </p>
        <p className=" mb-2">
          <strong>Phone:</strong> {user?.phone || "Not Available"}
        </p>
      </div>
    </div>
  );
};

export default Profile;

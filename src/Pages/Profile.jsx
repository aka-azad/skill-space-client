import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import SectionTitle from "../Components/SectionTitle";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <>Loading</>;
  }
  return (
    <div className="container mx-auto p-4">
      <SectionTitle title={user?.displayName} subtitle={"Welcome Back"} />{" "}
      <div className="bg-white p-4 shadow rounded flex flex-col items-center">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="User"
          className="w-32 h-32 object-cover rounded-full mb-4"
        />
        <h3 className="text-xl font-bold mb-2">
          {user?.displayName || "User Name"}
        </h3>
        <p className="text-gray-600 mb-2">
          <strong>Role:</strong> {user?.role || "Student"}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> {user?.email || "Email"}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Phone:</strong> {user?.phone || "Not Available"}
        </p>
      </div>
    </div>
  );
};

export default Profile;

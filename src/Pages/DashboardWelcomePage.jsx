import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const DashboardWelcomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container max-w-screen-sm mx-auto p-4">
      <div className="bg-accent bg-opacity-20 shadow-md rounded-lg p-6 text-center">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        ) : (
          <FaUserCircle className="text-6xl mx-auto mb-4 text-gray-400" />
        )}
        <h1 className="text-2xl font-bold mb-2">Welcome, {user.displayName}!</h1>
        <p className="text-gray-600 mb-4">We&apos;re glad to have you here.</p>
        <div className="text-left">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Last Sign-In:</strong> {user.metadata.lastSignInTime}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcomePage;

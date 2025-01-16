import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Components/SectionTitle";
import AuthContext from "../Context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Profile = () => {
  const { user: contextUser, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [fetchUser, setFetchUser] = useState(false);

  useEffect(() => {
    if (!loading && contextUser) {
      setFetchUser(true);
    }
  }, [loading, contextUser]);

  const fetchUserInfo = async () => {
    const response = await axiosPublic.get(`/users/${contextUser.email}`);
    return response.data;
  };
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserInfo,
    enabled: fetchUser, // This ensures the query runs only if fetchUser is true
  });

  if (loading || isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error loading user profile: {error.message}</>;
  }

  return (
    <div className="container mx-auto p-4">
      {user && (
        <SectionTitle title={user?.displayName} subtitle={"Welcome Back"} />
      )}
      <div className="bg-white p-4 shadow rounded flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-32 h-32 object-cover rounded-full mb-4"
        />
        <h3 className="text-xl font-bold mb-2">
          {user?.displayName || "User Name"}
        </h3>
        <p className="text-gray-600 mb-2">
          <strong>Role:</strong> {user?.role || "Student"}
        </p>
        {user?.authorization === "admin" && (
          <p className="text-gray-600 mb-2">
            <strong>Authorization: </strong> Admin
          </p>
        )}
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

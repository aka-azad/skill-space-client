import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import {  useNavigate } from "react-router";
import EnrolledClassCard from "../Components/EnrolledClassCard";

const EnrolledClasses = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    data: enrolledClasses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["enrolledClasses"],
    queryFn: () =>
      axiosPublic.get(`/enrollments/${user.email}`).then((res) => res.data),
  });

  const handleContinue = (classId) => {
    navigate(`/dashboard/class/${classId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading enrolled classes: {error.message}</div>;
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {enrolledClasses.map((classItem) => (
          <EnrolledClassCard
            key={classItem._id}
            classItem={classItem}
            handleContinue={handleContinue}
          />
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;

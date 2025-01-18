import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router";
import EnrolledClassCard from "../Components/EnrolledClassCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SectionTitle from "../Components/SectionTitle";
import LottieLoader from "../Components/LottieLoader";
import NoDataPage from "./NoDataPage";

const EnrolledClasses = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: enrolledClasses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["enrolledClasses"],
    queryFn: () =>
      axiosSecure.get(`/enrollments/${user.email}`).then((res) => res.data),
  });

  const handleContinue = (classId) => {
    navigate(`/dashboard/class/${classId}`);
  };

  if (error) return <div>Error loading enrolled classes: {error.message}</div>;
  return (
    <div className="container mx-auto p-4">
      <SectionTitle
        title="Enrolled Classes"
        subtitle={"Classes Bought By You"}
      />
      {isLoading && <LottieLoader />}
      {!isLoading && enrolledClasses.length == 0 && (
        <NoDataPage
          pageTitle="You Didn't Enroll To Any Class"
          message="Look For Your Knowledge booster from All Classes"
        />
      )}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {enrolledClasses.map((classItem) => (
            <EnrolledClassCard
              key={classItem._id}
              classItem={classItem}
              handleContinue={handleContinue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledClasses;

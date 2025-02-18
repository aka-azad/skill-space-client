import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ClassCard from "../Components/ClassCard";
import SectionTitle from "../Components/SectionTitle";
import { Helmet } from "react-helmet-async";
import LottieLoader from "../Components/LottieLoader";

const PopularClasses = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: classes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: () =>
      axiosPublic.get("/classes/popular").then((res) => res.data),
  });

  if (error) return <div>Error loading classes: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Skill Space | All Courses</title>
        <meta name="description" content="all classes" />
      </Helmet>
      <SectionTitle
        title="Popular Courses"
        subtitle="Go With The Trend"
      />
      {isLoading ? (
        <LottieLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map((classItem) => (
            <ClassCard key={classItem._id} classItem={classItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularClasses;

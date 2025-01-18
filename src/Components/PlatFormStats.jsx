import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "./SectionTitle";
import { FaUsers, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa"; // Import React Icons
import SmallLottieLoader from "./SmallLottieLoader";

const PlatformStats = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: stats,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: () => axiosPublic.get("/stats").then((res) => res.data),
  });

  if (error) return <div>Error loading stats: {error.message}</div>;

  return (
    <div className="py-12">
      <SectionTitle title="Our Dynamic Stats" />
      {isLoading ? (
        <SmallLottieLoader />
      ) : (
        <div className="flex container mx-auto gap-4 flex-col lg:flex-row items-center justify-between p-8">
          <div className="stats-vertical bg-accent  rounded-md bg-opacity-30  shadow">
            <div className="stat place-items-center">
              <div className="stat-title">
                <FaUsers className="inline-block mr-2" /> Total Users
              </div>
              <div className="stat-value">{stats.totalUsers}</div>
              <div className="stat-desc">Overall user count in the system</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">
                <FaChalkboardTeacher className="inline-block mr-2" /> Total
                Classes
              </div>
              <div className="stat-value">{stats.totalClasses}</div>
              <div className="stat-desc">
                Classes added from the teacher dashboard
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">
                <FaGraduationCap className="inline-block mr-2" /> Total
                Enrollments
              </div>
              <div className="stat-value">{stats.totalEnrollments}</div>
              <div className="stat-desc">
                Total enrollment count in the system
              </div>
            </div>
          </div>
          <div className="flex justify-center max-w-sm items-center mt-8 lg:mt-0">
            <img
              src={"https://i.ibb.co.com/d5f55Mm/stats-img.jpg"}
              alt="Relevant to Website"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformStats;

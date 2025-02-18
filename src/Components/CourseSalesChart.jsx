import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SmallLottieLoader from "./SmallLottieLoader";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CourseSalesChart = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: rawCourses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["topCourses"],
    queryFn: () => axiosSecure.get("/courseSalesChart").then((res) => res.data),
  });

  if (isLoading) return <SmallLottieLoader />;
  if (error) return <div>Error loading chart data: {error.message}</div>;

  const courseMap = rawCourses.reduce((acc, course) => {
    acc[course.title] = (acc[course.title] || 0) + course.totalEnrolment;
    return acc;
  }, {});

  const courses = Object.entries(courseMap).map(([title, totalEnrolment]) => ({
    title,
    totalEnrolment,
  }));

  return (
    <div className="bg-accent bg-opacity-30 p-6 mx-4  rounded-md shadow-md mt-8 ">
      <h2 className="text-2xl text-center font-semibold mb-4">
        Courses Sells Chart
      </h2>

      <div className="overflow-x-auto w-full">
        <ResponsiveContainer width="100%" minWidth={600} height={300}>
          <BarChart data={courses}>
            <XAxis dataKey="title" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalEnrolment" fill="#4CAF50" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseSalesChart;

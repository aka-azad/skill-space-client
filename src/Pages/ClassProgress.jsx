import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ClassProgress = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: classInfo,
    error: classError,
    isLoading: classLoading,
  } = useQuery({
    queryKey: ["classInfo", id],
    queryFn: () => axiosPublic.get(`/class/${id}`).then((res) => res.data),
  });

  const {
    data: assignments,
    error: assignmentError,
    isLoading: assignmentLoading,
  } = useQuery({
    queryKey: ["assignments", id],
    queryFn: () =>
      axiosPublic.get(`/assignments/class/${id}`).then((res) => res.data),
  });

  const {
    data: submissionCount,
    error: submissionError,
    isLoading: submissionLoading,
  } = useQuery({
    queryKey: ["submissionCount", id],
    queryFn: () =>
      axiosPublic.get(`/submissions/class/${id}/count`).then((res) => res.data),
  });

  if (classLoading || assignmentLoading || submissionLoading)
    return <div>Loading...</div>;
  if (classError)
    return <div>Error loading class information: {classError.message}</div>;
  if (assignmentError)
    return <div>Error loading assignments: {assignmentError.message}</div>;
  if (submissionError)
    return <div>Error loading submission count: {submissionError.message}</div>;
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {classInfo.title} - Class Progress
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-xl font-bold mb-2">Total Enrollment</h3>
          <p className="text-gray-600">{classInfo.totalEnrolment}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-xl font-bold mb-2">Total Assignments</h3>
          <p className="text-gray-600">{assignments.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-xl font-bold mb-2">
            Total Assignment Submissions
          </h3>
          <p className="text-gray-600">{submissionCount.count}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassProgress;

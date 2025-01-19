import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LottieLoader from "../Components/LottieLoader";

const TeachersApplications = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [approvedRequests, setApprovedRequests] = useState({});
  const [rejectedRequests, setRejectedRequests] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: applicationsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["teacherApplications", currentPage],
    queryFn: () =>
      axiosSecure
        .get(`/teachers?page=${currentPage}&limit=10`)
        .then((res) => res.data),
    keepPreviousData: true,
  });

  const approveMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.put(`/teachers/${id}`, { status: "accepted" }),
    onSuccess: (data, variables) => {
      axiosSecure.put(`/teachers-profile/${variables}`, { role: "teacher" });
      setApprovedRequests((prev) => ({ ...prev, [variables]: true }));
      queryClient.invalidateQueries(["teacherApplications", currentPage]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.put(`/teachers/${id}`, { status: "rejected" }),
    onSuccess: (data, variables) => {
      setRejectedRequests((prev) => ({ ...prev, [variables]: true }));
      queryClient.invalidateQueries(["teacherApplications", currentPage]);
    },
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };

  const totalPages = applicationsData
    ? Math.ceil(applicationsData.totalTeachers / 10)
    : 1;

  if (error) return <div>Error loading teacher requests: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <SectionTitle
        title="Teachers Applications"
        subtitle={"Approve if it meets requirements"}
      />
      {isLoading ? (
        <LottieLoader />
      ) : (
        <>
          <div className="w-full overflow-auto mb-20">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Experience</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {applicationsData.teachers.map((request) => (
                  <tr key={request._id}>
                    <td>{request.name}</td>
                    <td>
                      <img
                        src={request.image}
                        alt={request.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td>{request.experience}</td>
                    <td>{request.title}</td>
                    <td>{request.category}</td>
                    <td>
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </td>
                    <td>
                      {approvedRequests[request._id] ? (
                        <button className="btn btn-success" disabled>
                          Approved
                        </button>
                      ) : (
                        <button
                          className="btn btn-success"
                          disabled={request.status === "accepted" || request.status === "rejected"}
                          onClick={() => handleApprove(request._id)}
                        >
                          {request.status === "accepted"
                            ? "Approved"
                            : "Approve"}
                        </button>
                      )}
                    </td>
                    <td>
                      {rejectedRequests[request._id] ? (
                        <button className="btn btn-danger" disabled>
                          Rejected
                        </button>
                      ) : (
                        <button
                          disabled={request.status === "rejected"}
                          className="btn btn-danger"
                          onClick={() => handleReject(request._id)}
                        >
                          {request.status === "rejected"
                            ? "Rejected"
                            : "Reject"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {applicationsData && (
            <div className="fixed bottom-0 right-0 ml-auto w-full flex justify-between items-center bg-base-200 p-4 border-t border-gray-300 z-[10000]">
              <div>
                Total Applications:{" "}
                {applicationsData ? applicationsData.totalTeachers : 0} |
                Displaying:{" "}
                {applicationsData ? applicationsData.teachers.length : 0}{" "}
                applications
              </div>
              <div className="join">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`join-item btn ${
                      index + 1 === currentPage ? "btn-active" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeachersApplications;

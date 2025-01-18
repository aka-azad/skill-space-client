import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TeachersApplications = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [approvedRequests, setApprovedRequests] = useState({});
  const [rejectedRequests, setRejectedRequests] = useState({});

  const {
    data: applications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["teacherApplications"],
    queryFn: () => axiosSecure.get("/teachers").then((res) => res.data),
  });

  const approveMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.put(`/teachers/${id}`, { status: "accepted" }),
    onSuccess: (data, variables) => {
      axiosSecure.put(`/teachers-profile/${variables}`, { role: "teacher" });
      setApprovedRequests((prev) => ({ ...prev, [variables]: true }));
      queryClient.invalidateQueries(["teacherApplications"]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.put(`/teachers/${id}`, { status: "rejected" }),
    onSuccess: (data, variables) => {
      setRejectedRequests((prev) => ({ ...prev, [variables]: true }));
      queryClient.invalidateQueries(["teacherApplications"]);
    },
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading teacher requests: {error.message}</div>;
  return (
    <div className="container mx-auto p-4">
      <SectionTitle
        title="Teachers Applications"
        subtitle={"Approve if it meets requirements"}
      />
      <table className="table w-full overflow-auto">
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
          {applications.map((request) => (
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
                    disabled={request.status === "accepted"}
                    onClick={() => handleApprove(request._id)}
                  >
                    {request.status === "accepted" ? "Approved" : "Approve"}
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
                    {request.status === "rejected" ? "Rejected" : "Reject"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeachersApplications;

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AdminClassReview = () => {
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();

  const {
    data: classes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: () => axiosPublic.get("/classes").then((res) => res.data),
  });

  const [approvedClasses, setApprovedClasses] = useState({});
  const [rejectedClasses, setRejectedClasses] = useState({});

  const approveMutation = useMutation({
    mutationFn: (id) =>
      axiosPublic.put(`/classes/${id}`, { status: "accepted" }),
    onSuccess: (data, variables) => {
      setApprovedClasses((prev) => ({ ...prev, [variables]: true }));
      queryClient.invalidateQueries(["classes"]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) =>
      axiosPublic.put(`/classes/${id}`, { status: "rejected" }),
    onSuccess: (data, variables) => {
      setRejectedClasses((prev) => ({ ...prev, [variables]: true }));
      queryClient.invalidateQueries(["classes"]);
    },
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading classes: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Class Review</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Email</th>
            <th>Short Description</th>
            <th>Approve</th>
            <th>Reject</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td>{classItem.title}</td>
              <td>
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td>{classItem.email}</td>
              <td>{classItem.description.substring(0, 30)}...</td>
              <td>
                {approvedClasses[classItem._id] ? (
                  <button className="btn btn-success" disabled>
                    Approved
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    disabled={classItem.status === "accepted"}
                    onClick={() => handleApprove(classItem._id)}
                  >
                    {classItem.status === "accepted" ? "Approved" : "Approve"}
                  </button>
                )}
              </td>
              <td>
                {rejectedClasses[classItem._id] ? (
                  <button className="btn btn-danger" disabled>
                    Rejected
                  </button>
                ) : (
                  <button
                    disabled={classItem.status === "rejected"}
                    className="btn btn-danger"
                    onClick={() => handleReject(classItem._id)}
                  >
                    {classItem.status === "rejected" ? "Rejected" : "Reject"}
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  disabled={classItem.status !== "accepted"}
                >
                  Progress
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClassReview;

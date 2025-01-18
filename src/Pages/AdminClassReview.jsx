import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AdminClassReview = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const {
    data: classes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: () => axiosSecure.get("/classes").then((res) => res.data),
  });

  const [approvedClasses, setApprovedClasses] = useState({});
  const [rejectedClasses, setRejectedClasses] = useState({});

  const approveMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.put(`/classes/${id}`, { status: "accepted" }),
    onSuccess: (data, variables) => {
      setApprovedClasses((prev) => ({ ...prev, [variables]: true }));
      queryClient.invalidateQueries(["classes"]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.put(`/classes/${id}`, { status: "rejected" }),
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
      <Helmet>
        <title>Skill Space | Class Review</title>
        <meta name="description" content="all classes" />
      </Helmet>
      <SectionTitle
        title="Class Review"
        subtitle={"Approve if it meets requirements"}
      />
      <div className="w-full  overflow-auto">
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
          {classes &&
            classes.map((classItem) => (
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
                  <Link
                    to={`/dashboard/class-progress/${classItem._id}`}
                    className="btn btn-primary"
                    disabled={classItem.status !== "accepted"}
                  >
                    Progress
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminClassReview;

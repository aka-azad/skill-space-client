import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import LottieLoader from "../Components/LottieLoader";

const AdminClassReview = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: classesData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["classes", currentPage],
    queryFn: () =>
      axiosSecure
        .get(`/classes?page=${currentPage}&limit=10`)
        .then((res) => res.data),
    keepPreviousData: true,
  });

  const [approvedClasses, setApprovedClasses] = useState({});
  const [rejectedClasses, setRejectedClasses] = useState({});

  const approveMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.put(`/classes/${id}`, { status: "accepted" }),
    onSuccess: (data, variables) => {
      setApprovedClasses((prev) => ({ ...prev, [variables]: true }));
      queryClient.invalidateQueries(["classes", currentPage]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.put(`/classes/${id}`, { status: "rejected" }),
    onSuccess: (data, variables) => {
      setRejectedClasses((prev) => ({ ...prev, [variables]: true }));
      queryClient.invalidateQueries(["classes", currentPage]);
    },
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };

  const totalPages = classesData ? Math.ceil(classesData.totalClasses / 10) : 1;

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
      {isLoading && <LottieLoader />}
      {!isLoading && (
        <>
          <div className="w-full  overflow-auto mb-20">
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
                {classesData &&
                  classesData.classes.map((classItem) => (
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
                            {classItem.status === "accepted"
                              ? "Approved"
                              : "Approve"}
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
                            {classItem.status === "rejected"
                              ? "Rejected"
                              : "Reject"}
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
          {classesData && (
            <div className="fixed bottom-0 right-0 ml-auto w-full flex justify-between items-center bg-base-200 p-4 border-t border-gray-300 z-[10000]">
              <div>
                Total Classes: {classesData ? classesData.totalClasses : 0} |
                Displaying: {classesData ? classesData.classes.length : 0}{" "}
                classes
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

export default AdminClassReview;

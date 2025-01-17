import { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const MyClassDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentDeadline, setAssignmentDeadline] = useState("");

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

  const createAssignmentMutation = useMutation({
    mutationFn: (newAssignment) =>
      axiosPublic.post(`/assignments`, newAssignment),
    onSuccess: () => {
      queryClient.invalidateQueries(["assignments", id]);
      toast.success("Assignment created successfully!");
      setModalIsOpen(false);
    },
    onError: (error) => {
      toast.error(`Error creating assignment: ${error.message}`);
    },
  });

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const newAssignment = {
      classId: id,
      title: assignmentTitle,
      description: assignmentDescription,
      deadline: assignmentDeadline,
    };
    createAssignmentMutation.mutate(newAssignment);
  };

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

      <div className="mt-8">
        <button
          className="btn btn-primary"
          onClick={() => setModalIsOpen(true)}
        >
          Create Assignment
        </button>
      </div>

      {modalIsOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Create Assignment</h2>
            <form onSubmit={handleCreateAssignment}>
              <input
                type="text"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                className="input input-bordered w-full mb-4"
                placeholder="Assignment Title"
                required
              />
              <input
                type="date"
                value={assignmentDeadline}
                onChange={(e) => setAssignmentDeadline(e.target.value)}
                className="input input-bordered w-full mb-4"
                placeholder="Assignment Deadline"
                required
              />
              <textarea
                value={assignmentDescription}
                onChange={(e) => setAssignmentDescription(e.target.value)}
                className="textarea textarea-bordered w-full mb-4"
                placeholder="Assignment Description"
                required
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Add Assignment
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setModalIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClassDetails;

import { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import ReactStars from "react-rating-stars-component";
import useAxiosSecure from "../hooks/useAxiosSecure";

const EnrolledClassDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [assignmentSubmission, setAssignmentSubmission] = useState({});
  const [evaluationDescription, setEvaluationDescription] = useState("");

  const {
    data: assignments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["assignments", id],
    queryFn: () =>
      axiosSecure.get(`/assignments/class/${id}`).then((res) => res.data),
  });

  const submitMutation = useMutation({
    mutationFn: ({ assignmentId, submissionLink }) =>
      axiosSecure.post(`/assignments/submit`, {
        assignmentId,
        classId: id,
        userEmail: user.email,
        submissionLink,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["assignments", id]);
      toast.success("Assignment submitted successfully!");
    },
    onError: (error) => {
      toast.error(`Error submitting assignment: ${error.message}`);
    },
  });

  const evaluationMutation = useMutation({
    mutationFn: () =>
      axiosSecure.post("/evaluations", {
        classId: id,
        userEmail: user.email,
        userName: user.displayName,
        userImage: user.photoURL,
        description: evaluationDescription,
        rating,
        date: new Date().toISOString(),
      }),
    onSuccess: () => {
      toast.success("Evaluation submitted successfully!");
      setModalIsOpen(false);
      setEvaluationDescription("");
    },
    onError: (error) => {
      toast.error(`Error submitting evaluation: ${error.message}`);
    },
  });

  const handleAssignmentChange = (e, assignmentId) => {
    setAssignmentSubmission((prev) => ({
      ...prev,
      [assignmentId]: e.target.value,
    }));
  };

  const handleAssignmentSubmit = (e, assignmentId) => {
    e.preventDefault();
    console.log(assignmentSubmission[assignmentId]);
    submitMutation.mutate({
      assignmentId,
      submissionLink: assignmentSubmission[assignmentId],
    });
  };

  const handleEvaluationSubmit = (e) => {
    e.preventDefault();
    evaluationMutation.mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading assignments: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Assignments for this Course</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Deadline</th>
            <th className="px-4 py-2">Submit</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td className="border px-4 py-2">{assignment.title}</td>
              <td className="border px-4 py-2">{assignment.description}</td>
              <td className="border px-4 py-2">{assignment.deadline}</td>
              <td className="border px-4 py-2">
                <form
                  onSubmit={(e) => handleAssignmentSubmit(e, assignment._id)}
                >
                  <input
                    type="url"
                    defaultValue={assignmentSubmission[assignment._id]}
                    onChange={(e) => handleAssignmentChange(e, assignment._id)}
                    className="input input-bordered w-full"
                    placeholder="Submission link"
                    required
                  />
                  <button className="btn btn-primary mt-2 w-full" type="submit">
                    Submit
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-secondary mt-4"
        onClick={() => setModalIsOpen(true)}
      >
        Create Teaching Evaluation Report (TER)
      </button>

      {modalIsOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">
              Teaching Evaluation Report (TER)
            </h2>
            <form onSubmit={handleEvaluationSubmit}>
              <textarea
                value={evaluationDescription}
                onChange={(e) => setEvaluationDescription(e.target.value)}
                className="textarea textarea-bordered w-full mb-4"
                placeholder="Description"
                required
              />
              <div className="mb-4">
                <ReactStars
                  count={5}
                  onChange={(newRating) => setRating(newRating)}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
              <div className="modal-action ">
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
                <button
                  className="btn"
                  type="button"
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

export default EnrolledClassDetails;

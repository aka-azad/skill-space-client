import { useContext } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import Modal from "react-modal";
// import ReactStars from "react-rating-stars-component";
import AuthContext from "../Context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const EnrolledClassDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [evaluationDescription, setEvaluationDescription] = useState("");
  // const [rating, setRating] = useState(0);

  const {
    data: assignments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["assignments", id],
    queryFn: () =>
      axiosPublic.get(`/assignments/${id}`).then((res) => res.data),
  });

  const submitMutation = useMutation({
    mutationFn: (assignmentId) =>
      axiosPublic.post(`/assignments/submit`, {
        assignmentId,
        userEmail: user.email,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["assignments", id]);
      toast.success("Assignment submitted successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
    onError: (error) => {
      toast.error(`Error submitting assignment: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  const handleSubmit = (assignmentId) => {
    submitMutation.mutate(assignmentId);
  };

  // const handleOpenModal = () => setModalIsOpen(true);
  // const handleCloseModal = () => setModalIsOpen(false);
  // const handleSendEvaluation = () => {
  //   // Save the evaluation data in the database
  //   axiosPublic
  //     .post("/evaluations", {
  //       classId: id,
  //       userEmail: user.email,
  //       description: evaluationDescription,
  //       rating,
  //       date: new Date().toISOString(),
  //     })
  //     .then(() => {
  //       toast.success("Evaluation submitted successfully!");
  //       setModalIsOpen(false);
  //     })
  //     .catch((error) => {
  //       toast.error(`Error submitting evaluation: ${error.message}`, {
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //     });
  // };

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
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Submission link"
                />
                <button
                  className="btn btn-primary mt-2 w-full"
                  onClick={() => handleSubmit(assignment._id)}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-secondary mt-4" onClick={"handleOpenModal"}>
        Create Teaching Evaluation Report (TER)
      </button>

      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Teaching Evaluation Report"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">
          Teaching Evaluation Report (TER)
        </h2>
        <textarea
          value={evaluationDescription}
          onChange={(e) => setEvaluationDescription(e.target.value)}
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Description"
        />
        <div className="mb-4">
          <ReactStars
            count={5}
            onChange={(newRating) => setRating(newRating)}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={handleSendEvaluation}
        >
          Send
        </button>
        <button
          className="btn btn-secondary w-full mt-2"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </Modal> */}
    </div>
  );
};

export default EnrolledClassDetails;

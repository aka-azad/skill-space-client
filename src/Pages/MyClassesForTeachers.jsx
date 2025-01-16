import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
// import Modal from "react-modal";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";

const MyClass = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  const {
    data: myClasses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["myClasses", user?.email],
    queryFn: () =>
      axiosPublic.get(`/classes/teacher/${user?.email}`).then((res) => res.data),
    enabled: loading,
  });

  const updateMutation = useMutation({
    mutationFn: (updatedClass) =>
      axiosPublic.put(`/classes/${updatedClass._id}`, updatedClass),
    onSuccess: () => {
      queryClient.invalidateQueries(["myClasses", user.email]);
      toast.success("Class updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setModalIsOpen(false);
    },
    onError: (error) => {
      toast.error(`Error updating class: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (classId) => axiosPublic.delete(`/classes/${classId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myClasses", user.email]);
      toast.success("Class deleted successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
    onError: (error) => {
      toast.error(`Error deleting class: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  const handleUpdate = (classItem) => {
    setCurrentClass(classItem);
    setModalIsOpen(true);
  };

  const handleDelete = (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      deleteMutation.mutate(classId);
    }
  };

  const handleSeeDetails = (classId) => {
    navigate(`/dashboard/my-class/${classId}`);
  };

  const handleModalSubmit = () => {
    updateMutation.mutate(currentClass);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading classes: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {myClasses.map((classItem) => (
          <div key={classItem._id} className="bg-white p-4 shadow rounded">
            <img
              src={classItem.image}
              alt={classItem.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
            <p className="text-gray-600 mb-2">
              <strong>By:</strong> {classItem.name}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {classItem.email}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Price:</strong> ${classItem.price}
            </p>
            <p className="text-gray-600 mb-2">{classItem.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>Status:</strong> {classItem.status}
            </p>
            <button
              className="btn btn-primary w-full mb-2"
              onClick={() => handleUpdate(classItem)}
            >
              Update
            </button>
            <button
              className="btn btn-danger w-full mb-2"
              onClick={() => handleDelete(classItem._id)}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary w-full"
              disabled={classItem.status !== "approved"}
              onClick={() => handleSeeDetails(classItem._id)}
            >
              See Details
            </button>
          </div>
        ))}
      </div>

      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Update Class"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Update Class</h2>
        {currentClass && (
          <form onSubmit={handleModalSubmit}>
            <input
              type="text"
              value={currentClass.title}
              onChange={(e) =>
                setCurrentClass({ ...currentClass, title: e.target.value })
              }
              className="input input-bordered w-full mb-4"
              placeholder="Title"
              required
            />
            <input
              type="text"
              value={currentClass.price}
              onChange={(e) =>
                setCurrentClass({ ...currentClass, price: e.target.value })
              }
              className="input input-bordered w-full mb-4"
              placeholder="Price"
              required
            />
            <textarea
              value={currentClass.description}
              onChange={(e) =>
                setCurrentClass({
                  ...currentClass,
                  description: e.target.value,
                })
              }
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Description"
              required
            />
            <input
              type="text"
              value={currentClass.image}
              onChange={(e) =>
                setCurrentClass({ ...currentClass, image: e.target.value })
              }
              className="input input-bordered w-full mb-4"
              placeholder="Image URL"
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Update
            </button>
          </form>
        )}
      </Modal> */}
    </div>
  );
};

export default MyClass;

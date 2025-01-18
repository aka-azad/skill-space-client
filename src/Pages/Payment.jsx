import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "../Components/SectionTitle";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Payment = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    data: classItem,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: () => axiosPublic.get(`/class/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: () =>
      axiosSecure.post(`/payments`, {
        classId: id,
        amount: classItem.price,
        userEmail: user.email,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["enrolledClasses"]);
      toast.success("Payment processed successfully!");
      navigate("/dashboard/enrolled-classes");
    },
    onError: (error) => {
      toast.error(`Error processing payment: ${error.response.data.message}`);
    },
  });

  const handlePayment = () => {
    mutation.mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading class details: {error.message}</div>;

  return (
    <div className="container max-w-screen-md mx-auto p-4">
      <SectionTitle title={`Payment for ${classItem.title}`} />
      <p className=" mb-4">Price: ${classItem.price}</p>
      <button
        className="btn btn-primary w-full"
        onClick={handlePayment}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;

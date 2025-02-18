import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaUser, FaDollarSign, FaClipboardList, FaUsers } from "react-icons/fa";
import SectionTitle from "../Components/SectionTitle";
import LottieLoader from "../Components/LottieLoader";

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { data: classItem, error, isLoading } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: () => axiosPublic.get(`/class/${id}`).then((res) => res.data),
  });

  const handlePay = () => {
    navigate(`/make-payments/${id}`);
  };

  if (error) return <div className="text-red-500 text-center font-semibold">Error loading class details: {error.message}</div>;

  return (
    <div className="container max-w-screen-md mx-auto p-6">
      {isLoading ? (
        <LottieLoader />
      ) : (
        <div className="bg-accent bg-opacity-30 text-accent-content shadow-lg rounded-lg p-6">
          <SectionTitle title={classItem.title} />
          <img
            src={classItem.image}
            alt={classItem.title}
            className="w-full aspect-video object-cover object-center rounded-lg mb-6"
          />
          <div className="space-y-3 ">
            <p className="text-lg font-semibold flex items-center">
              <FaUser className="mr-2 text-blue-500" /> {classItem.name}
            </p>
            <p className="text-lg font-semibold flex items-center">
              <FaDollarSign className="mr-2 text-green-500" /> ${classItem.price}
            </p>
            <p className="text-base flex items-start">
              <FaClipboardList className="mr-2 text-yellow-500 w-5 h-5" />
              <span>{classItem.description}</span>
            </p>
            <p className="text-lg font-semibold flex items-center">
              <FaUsers className="mr-2 text-purple-500" /> {classItem.totalEnrolment} Students Enrolled
            </p>
          </div>
          <button
            className="mt-6 btn btn-primary font-bold py-3 px-6 rounded-lg w-full hover:bg-blue-700 transition"
            onClick={handlePay}
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;

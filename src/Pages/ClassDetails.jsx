import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaUser, FaDollarSign, FaClipboardList, FaUsers } from "react-icons/fa";
import SectionTitle from "../Components/SectionTitle";

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    data: classItem,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: () => axiosPublic.get(`/class/${id}`).then((res) => res.data),
  });

  const handlePay = () => {
    navigate(`/payment/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading class details: {error.message}</div>;

  return (
    <div className="container max-w-screen-md mx-auto p-4">
      <SectionTitle title={classItem.title} />
      <img
        src={classItem.image}
        alt={classItem.title}
        className="w-full  aspect-video object-cover object-center rounded mb-4"
      />
      <p className="text-base mb-2 flex items-center">
        <FaUser className="mr-2" /> {classItem.name}
      </p>
      <p className="text-base mb-2 flex items-center">
        <FaDollarSign className="mr-2" /> {classItem.price}
      </p>
      <div className="text-accent-content mb-2 flex items-center">
        <p>
          <FaClipboardList className="text-base mr-2 w-4 h-4" />
        </p>
        <p className="">{classItem.description}</p>
      </div>{" "}
      <p className="text-base mb-4 flex items-center">
        <FaUsers className="mr-2" />
        {classItem.totalEnrolment}
      </p>
      <button className="btn btn-primary w-full" onClick={handlePay}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default ClassDetails;

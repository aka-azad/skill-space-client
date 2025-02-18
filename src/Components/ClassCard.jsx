import PropTypes from "prop-types";
import {
  FaUser,
  FaDollarSign,
  FaClipboardList,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const ClassCard = ({ classItem }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate(`/class-details/${classItem._id}`, {
      state: { from: `/class-details/${classItem._id}` },
    });
  };

  return (
    <div className="bg-accent bg-opacity-60 p-4 shadow rounded">
      <img
        src={classItem.image}
        alt={classItem.title}
        className="w-full h-40 object-cover object-center rounded mb-4"
      />
      <h3 className="text-xl font-bold mb-2 truncate">{classItem.title}</h3>
      <p className="text-accent-content mb-2 flex items-center truncate">
        <FaUser className="mr-2 text-blue-500" />
        {classItem.name}
      </p>
      <p className="text-accent-content mb-2 flex items-center truncate">
        <FaDollarSign className="mr-2 text-green-500" />${classItem.price}
      </p>
      <div className="text-accent-content mb-2 flex ">
        <p>
          <FaClipboardList className="text-base text-yellow-500 mr-2 w-4 h-4 mt-1" />
        </p>
        <div className="h-12 overflow-hidden">
          <p className="">{classItem.description}</p>
        </div>
      </div>
      <p className="text-accent-content mb-4 flex items-center truncate">
        <FaUsers className="mr-2 text-purple-500" />
        {classItem.totalEnrolment || 0} Enrolled
      </p>
      <button
        onClick={handleEnroll}
        // to={`/class-details/${classItem._id}`}
        // state={{ from: `/class-details/${classItem._id}` }}
        className="btn btn-primary font-bold w-full flex items-center justify-center"
      >
        <FaCheckCircle className="mr-2" /> View Details{" "}
      </button>
    </div>
  );
};

ClassCard.propTypes = {
  classItem: PropTypes.object.isRequired,
};

export default ClassCard;

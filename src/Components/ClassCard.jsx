import PropTypes from "prop-types";
import {
  FaUser,
  FaDollarSign,
  FaClipboardList,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from 'react-router';

const ClassCard = ({ classItem }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate(`/class-details/${classItem._id}`);
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
        <FaUser className="mr-2" />
        {classItem.name}
      </p>
      <p className="text-accent-content mb-2 flex items-center truncate">
        <FaDollarSign className="mr-2" />${classItem.price}
      </p>
      <div className="text-accent-content mb-2 flex items-center">
        <p>
          <FaClipboardList className="text-base mr-2 w-4 h-4" />
        </p>
        <p className="truncate">{classItem.description}</p>
      </div>
      <p className="text-accent-content mb-4 flex items-center truncate">
        <FaUsers className="mr-2" />
        {classItem.totalEnrolment}
      </p>
      <button className="btn btn-primary font-bold w-full flex items-center justify-center" onClick={handleEnroll}>
        <FaCheckCircle className="mr-2" />
        Enroll
      </button>
    </div>
  );
};

ClassCard.propTypes = {
  classItem: PropTypes.object.isRequired,
};

export default ClassCard;

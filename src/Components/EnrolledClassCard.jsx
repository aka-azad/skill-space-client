import PropTypes from "prop-types";
import { Link } from "react-router";

const EnrolledClassCard = ({ classItem }) => {
  return (
    <div>
      <div className="bg-white p-4 shadow rounded">
        <img
          src={classItem.image}
          alt={classItem.title}
          className="w-full h-40 object-cover rounded mb-4"
        />
        <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
        <p className="text-gray-600 mb-2">
          <strong>By:</strong> {classItem.name}
        </p>
        <Link
          className="btn btn-primary w-full"
          to={`/dashboard/class/${classItem._id}`}
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

EnrolledClassCard.propTypes = {
  classItem: PropTypes.object.isRequired,
};

export default EnrolledClassCard;

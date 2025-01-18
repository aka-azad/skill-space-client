import PropTypes from "prop-types";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const NoDataPage = ({ pageTitle, message, from }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100">
      <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
      <h1 className="text-3xl text-black font-bold mb-2">{pageTitle}</h1>
      <p className="text-lg text-black">{message}</p>
      {from === "my-classes" && (
        <Link
          to={"/dashboard/add-class"}
          className="btn btn-success text-success-content text-xl"
        >
          Add New Course
        </Link>
      )}
      {from === "enrolled-classes" && (
        <Link
          to={"/all-classes"}
          className="btn btn-success text-success-content text-xl"
        >
          See Available Classes
        </Link>
      )}
    </div>
  );
};

NoDataPage.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  message: PropTypes.string,
  from: PropTypes.string,
};

export default NoDataPage;

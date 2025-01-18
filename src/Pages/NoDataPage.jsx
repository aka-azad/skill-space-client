import PropTypes from 'prop-types';
import { FaExclamationTriangle } from 'react-icons/fa';

const NoDataPage = ({ pageTitle, message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
      <p className="text-lg ">{message}</p>
    </div>
  );
};

NoDataPage.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default NoDataPage;

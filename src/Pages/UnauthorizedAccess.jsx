import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const UnauthorizedAccess = () => {
  return (
    <div className="flex flex-col mt-7 rounded-lg items-center justify-center min-h-[70vh] bg-gray-100">
      <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
      <h1 className="text-3xl text-black font-bold mb-2">Forbidden Access</h1>
      <p className="text-lg text-black">No Entry</p>
      <Link to={"/"} className="btn btn-success text-success-content text-xl">
        Go Back To Home
      </Link>
    </div>
  );
};

export default UnauthorizedAccess;

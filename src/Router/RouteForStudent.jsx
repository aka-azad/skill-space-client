import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import LottieLoader from "../Components/LottieLoader";
import UnauthorizedAccess from "../Pages/UnauthorizedAccess";

const StudentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <LottieLoader />;
  }
  if (user?.role === "student") {
    return children;
  }

  return <UnauthorizedAccess/>;
};

StudentRoute.propTypes = {
  children: PropTypes.node,
};

export default StudentRoute;

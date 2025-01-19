import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import LottieLoader from "../Components/LottieLoader";
import UnauthorizedAccess from "../Pages/UnauthorizedAccess";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <LottieLoader />;
  }
  if (user?.role === "teacher") {
    return children;
  }

  return <UnauthorizedAccess/>;
};

TeacherRoute.propTypes = {
  children: PropTypes.node,
};

export default TeacherRoute;

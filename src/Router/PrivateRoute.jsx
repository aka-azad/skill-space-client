import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../Context/AuthContext";
import LottieLoader from "../Components/LottieLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()
  if (loading) {
    return <LottieLoader />;
  }
  if (user) {
    return children;
  }

  return <Navigate to={"/sign-in"} state={location?.state}/>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;

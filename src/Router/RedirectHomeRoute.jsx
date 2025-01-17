import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../Context/AuthContext";
import LottieLoader from "../Components/LottieLoader";

const RedirectHomeRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <LottieLoader />;
  }
  if (!user) {
    return children;
  }

  return <Navigate to={"/"} />;
};

RedirectHomeRoute.propTypes = {
  children: PropTypes.node,
};

export default RedirectHomeRoute;

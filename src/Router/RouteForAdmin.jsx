import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import LottieLoader from "../Components/LottieLoader";
import UnauthorizedAccess from "../Pages/UnauthorizedAccess";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <LottieLoader />;
  }
  if (user?.authorization === "admin") {
    return children;
  }

  return <UnauthorizedAccess/>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;

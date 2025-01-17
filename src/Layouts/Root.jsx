import { Outlet } from "react-router";
import RootNavbar from "../Components/RootNavbar";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <div>
      <RootNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;

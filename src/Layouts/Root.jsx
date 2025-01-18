import { Outlet } from "react-router";
import RootNavbar from "../Components/RootNavbar";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <div>
      <RootNavbar />
      <div className="min-h-screen"> 

      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;

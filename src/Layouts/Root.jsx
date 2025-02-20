import { Outlet } from "react-router";
import RootNavbar from "../Components/RootNavbar";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <div>
      <RootNavbar />
      <div className="min-h-[60vh]"> 

      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;

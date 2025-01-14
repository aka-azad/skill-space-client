import { Outlet } from "react-router";
import RootNavbar from "../Components/RootNavbar";

const Root = () => {
  return (
    <div>
      <RootNavbar />
      <Outlet />
    </div>
  );
};

export default Root;

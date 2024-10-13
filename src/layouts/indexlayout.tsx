import NavbarDefault from "../components/navbar/default";
import { Outlet,Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { RootState } from "../store/store";

const IndexLayout = () => {
  const { isLogin, profile } = useAppSelector((state:RootState) => state.auth);

  if (isLogin && profile) {
   return <Navigate to="/main/thismonth"/>
  }
  return (
    <div className="h-screen">
      <NavbarDefault />
      <Outlet />
    </div>
  );
};

export default IndexLayout;

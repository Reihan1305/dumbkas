import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { RootState } from "../store/store";
const AuthLayout = () => {
  const { isLogin, profile } = useAppSelector((state: RootState) => state.auth);

  if (isLogin && profile) {
   return <Navigate to="/main/thismonth"/>
  }
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { getProfileAsync } from "../store/asyncThunks/authAsync";
import { RootState } from "../store/store";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const { isLogin, profile } = useAppSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getProfileAsync())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);

  const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-emerald-400"></div>
      </div>
    );
  }

  if (!isLogin && isEmptyObject(profile)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen h-full bg-slate-200">
      <Outlet />
    </div>
  );
};

export default MainLayout;

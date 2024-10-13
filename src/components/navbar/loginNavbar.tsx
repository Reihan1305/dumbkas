import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logoutAsync } from "../../store/asyncThunks/authAsync";
const LoginNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(logoutAsync());
    navigate("/");
  };
  const { profile } = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-row justify-between px-10 py-5 bg-emerald-300">
      <h3 className={`font-bold text-2xl text-sky-800`}>DumbCash</h3>
      <div className="flex gap-5">
        <p className={`font-bold text-lg text-sky-800 px-5 rounded-md`}>
          Hello, {profile.username}
        </p>
        <button
          onClick={() => onClick()}
          className={`font-bold text-lg text-sky-800  hover:bg-emerald-100  ease-in-out delay-150 hover:scale-11 duration-300 px-5 rounded-md`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoginNavbar;

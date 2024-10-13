import { useNavigate } from "react-router-dom";
const NavbarDefault = () => {
  const navigate = useNavigate()
  const onClick = (pathName:string)=>{
    navigate(`/auth/${pathName}`)
  }


  return (
    <div className="flex flex-row justify-between mx-10 my-5">
      <h3 className={`font-bold text-2xl text-sky-800`}>DumbCash</h3>
      <div className="flex gap-5">
        <button
        onClick={() =>onClick("login")}
          className={`font-bold text-lg text-sky-800 hover:bg-emerald-100  ease-in-out delay-150 hover:scale-11 duration-300 px-5 rounded-md`}
        >
          Login
        </button>
        <button
        onClick={() =>onClick("register")}
          className={`font-bold text-lg text-sky-800  hover:bg-emerald-100  ease-in-out delay-150 hover:scale-11 duration-300 px-5 rounded-md`}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavbarDefault;

import { NavLink } from "react-router-dom";

const TabList = () => {
  const TabStyle = "inline-block p-4 ";
  return (
    <div className="mx-96 justify-center text-xl flex border-b-4 border-emerald-400 mt-5 font-bold text-sky-800">
      <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
          <NavLink
            to={"/main/lastmonth"}
            className={({ isActive }) =>
              `${TabStyle}${{ isActive }} ${
                isActive
                  ? "border-b-4 border-emerald-400"
                  : "hover:border-b-4 hover:border-emerald-400"
              }`
            }
          >
            Last Month
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to={"/main/thismonth"}
            className={({ isActive }) =>
              `${TabStyle}${{ isActive }} ${
                isActive
                  ? "border-b-4 border-emerald-400"
                  : "hover:border-b-4 hover:border-emerald-400"
              }`
            }
          >
            This Month
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to={"/main/futuremonth"}
            className={({ isActive }) =>
              `${TabStyle}${{ isActive }} ${
                isActive
                  ? "border-b-4 border-emerald-400"
                  : "hover:border-b-4 hover:border-emerald-400"
              }`
            }
          >
            Future Month
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TabList;

import { Link } from "react-router-dom";
import useRegister from "../../hooks/AuthHooks/useRegister";

const Register = () => {
  const formik = useRegister()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-start text-sky-800">
          Register
        </h2>

        <div className="mb-4">
          <input
            placeholder="email"
            name="email"
            type="email"
            id="email"
            className={`border p-2 rounded w-full ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            } focus:border-blue-600 focus:outline-none focus:border-2`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            placeholder="password"
            name="password"
            type="password"
            id="password"
            className={`border p-2 rounded w-full ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            } focus:border-blue-600 focus:outline-none focus:border-2`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            placeholder="User Name"
            name="userName"
            type="text"
            id="userName"
            className={`border p-2 rounded w-full ${
              formik.touched.userName && formik.errors.userName
                ? "border-red-500"
                : "border-gray-300"
            } focus:border-blue-600 focus:outline-none focus:border-2`}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.userName && formik.errors.userName && (
            <div className="text-red-500 text-sm">{formik.errors.userName}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
        <p className="mt-3 text-sky-800">
          Already have an account ? Klik
          <Link className="font-bold" to={"/auth/login"}>
            {" "}
            Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

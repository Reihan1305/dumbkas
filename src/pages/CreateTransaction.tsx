import { Link } from "react-router-dom";
import useAddTransaction from "../hooks/transactionsHooks/useAddTransaction";

const CreateTransaction = () => {

  const {formik,categoryOption}= useAddTransaction()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 bg-white pb-7 px-5 rounded-md flex flex-col justify-center mx-auto">
        <Link
          to={"/main/thismonth"}
          className="flex flex-row justify-between items-center pt-5 pb-2"
        >
          <h1 className="text-sky-800 font-bold text-xl">Add Transaction</h1>
          <img src="/close.png" style={{ width: "10px", height: "10px" }} />
        </Link>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="amount" className="text-sky-800 font-bold">
              Amount
            </label>
            <input
              value={formik.values.totalTransaction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="totalTransaction"
              name="totalTransaction"
              type="number"
              className={`border-2 rounded p-2 focus:border-sky-400 focus:outline-none ${
                formik.touched.totalTransaction && formik.errors.totalTransaction
                  ? "border-red-500"
                  : "border-sky-800"
              }`}
            />
            {formik.touched.totalTransaction && formik.errors.totalTransaction && (
              <p className="text-red-500 text-sm">{formik.errors.totalTransaction}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="Date" className="text-sky-800 font-bold">
              Date
            </label>
            <input
              value={formik.values.createdAt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="createdAt"
              name="createdAt"
              type="date"
              className={`border-2 rounded p-2 focus:border-sky-400 focus:outline-none ${
                formik.touched.createdAt && formik.errors.createdAt
                  ? "border-red-500"
                  : "border-sky-800"
              }`}
            />
            {formik.touched.createdAt && formik.errors.createdAt && (
              <p className="text-red-500 text-sm">{formik.errors.createdAt}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="categoryId" className="text-sky-800 font-bold">
              Category
            </label>
            <select
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="categoryId"
              name="categoryId"
              className={`border-2 rounded p-2 focus:border-sky-400 focus:outline-none ${
                formik.touched.categoryId && formik.errors.categoryId
                  ? "border-red-500"
                  : "border-sky-800"
              }`}
            >
              {categoryOption.map((items)=>(
                <option value={items.id}>{items.name}</option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <p className="text-red-500 text-sm">{formik.errors.categoryId}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="note" className="text-sky-800 font-bold">
              Note
            </label>
            <textarea
              value={formik.values.information}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ resize: "none" }}
              id="information"
              name="information"
              className={`border-2 rounded p-2 focus:border-sky-400 focus:outline-none ${
                formik.touched.information && formik.errors.information
                  ? "border-red-500"
                  : "border-sky-800"
              }`}
            />
            {formik.touched.information && formik.errors.information && (
              <p className="text-red-500 text-sm">{formik.errors.information}</p>
            )}
          </div>

          <button
            type="submit"
            className="text-center w-full font-bold text-white bg-sky-400 rounded-md py-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;

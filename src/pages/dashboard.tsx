import FeatureCards from "../components/dashboard/featureCard";
import SummaryCard from "../components/dashboard/summaryCard";
import TestiCard from "../components/dashboard/testiCard";
import TransactionCard from "../components/dashboard/transactionCard";

const Dashboard = () => {
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col items-center pt-10">
        <p className={`font-semibold text-5xl text-emerald-400`}>Simple ways</p>
        <div>
          <span className={`font-semibold text-5xl text-sky-800`}>
            to manage{" "}
          </span>
          <span className={`font-semibold text-5xl text-emerald-400`}>
            personal finance
          </span>
        </div>
      </div>
      <FeatureCards />
      <div className="flex flex-row  justify-center items-center gap-14">
        <TransactionCard />
        <div className="w-96 flex flex-col gap-2">
          <div>
            <span className={`font-medium text-3xl text-sky-800`}>Simple</span>
            <span className={`font-medium text-3xl text-emerald-400`}>
              {" "}
              money tracker
            </span>
          </div>
          <p className={`font-medium text-sm text-sky-800`}>
            It takes seconds to record daily transactions. Put them into clear
            and visualized categories such as Expense: Food, Shopping or Income:
            Salary, Gift
          </p>
        </div>
      </div>
      <div className="flex flex-row  justify-center items-center gap-14">
        <div className="w-96 flex flex-col gap-2">
          <div className="text-end">
            <span className={`font-medium text-end text-3xl text-sky-800`}>
              Painless
            </span>
            <span className={`font-medium text-3xl text-emerald-400`}>
              {" "}
              budgeting
            </span>
          </div>
          <p className={`font-medium text-sm text-sky-800 text-end`}>
            One report to give a clear view on your spending patterns.
            Understand where your money comes and goes with easy-to-read graphs.
          </p>
        </div>
        <SummaryCard />
      </div>
      <div className="flex flex-col my-10 gap-5">
        <TestiCard />
      </div>
      <footer className="bg-white my-10 py-5 text-center">
        © 2022 DumbKas Co., Ltd. All rights reserved
      </footer>
    </div>
  );
};

export default Dashboard;

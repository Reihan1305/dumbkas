import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  getLastMonthTransaction,
  getNextMonthTransaction,
  getThisMonthTransaction,
} from "../../../store/asyncThunks/transactionAsync";
import {
  getLastMonthBalance,
  getNextMonthBalance,
  getThisMonthBalance,
} from "../../../store/asyncThunks/balanceAsync";
import MainComponent from "../../../components/main/mainComponent";

const monthParams = {
  lastMonth: "lastmonth",
  thisMonth: "thismonth",
  nextMonth: "futuremonth",
};

const MainTransaction = () => {
  const { month } = useParams();
  const dispatch = useAppDispatch();
  const {
    lastMonthTransaction,
    thisMonthTransaction,
    nextMonthTransaction,
    loading: transactionLoading,
  } = useAppSelector((state) => state.transaction);
  const {
    lastMontBalance,
    thisMonthBalance,
    nextMonthBalance,
    loading: balanceLoading,
  } = useAppSelector((state) => state.balance);

  const [componentRender, setComponentRender] = useState<JSX.Element | null>(
    null
  );

  useEffect(() => {
    const getData = async () => {
      try {
        switch (month) {
          case monthParams.lastMonth:
            await dispatch(getLastMonthTransaction()).unwrap();
            await dispatch(getLastMonthBalance()).unwrap();
            break;
          case monthParams.thisMonth:
            await dispatch(getThisMonthTransaction()).unwrap();
            await dispatch(getThisMonthBalance()).unwrap();
            break;
          case monthParams.nextMonth:
            await dispatch(getNextMonthTransaction()).unwrap();
            await dispatch(getNextMonthBalance()).unwrap();
            break;
          default:
            throw new Error("Invalid month parameter");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  }, [month, dispatch]);

  useEffect(() => {
    if (!transactionLoading && !balanceLoading) {
      const transactions =
        month === monthParams.lastMonth
          ? lastMonthTransaction
          : month === monthParams.thisMonth
          ? thisMonthTransaction
          : nextMonthTransaction;

      const balance =
        month === monthParams.lastMonth
          ? lastMontBalance
          : month === monthParams.thisMonth
          ? thisMonthBalance
          : nextMonthBalance;

      setComponentRender(
        <MainComponent transaction={transactions} Balance={balance} />
      );
    }
  }, [
    month,
    lastMonthTransaction,
    thisMonthTransaction,
    nextMonthTransaction,
    lastMontBalance,
    thisMonthBalance,
    nextMonthBalance,
    transactionLoading,
    balanceLoading,
    dispatch,
  ]);

  if (transactionLoading || balanceLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-emerald-400"></div>
      </div>
    );
  }

  return <div>{componentRender}</div>;
};

export default MainTransaction;

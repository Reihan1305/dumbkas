import React from "react";
import { GroupedTransaction, Transaction } from "../../types/type";
import { days, months } from "../../utils/days";
import { TypeCategory } from "../../types/enum";
import { useNavigate } from "react-router-dom";

interface TransactionProps {
  transactions: GroupedTransaction[]
}

const TransactionComponent: React.FC<TransactionProps> = ({ transactions }) => {
  const navigate = useNavigate()
  function formatRupiah(number: number) {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  const totalAmount = (transactions: Transaction[]): number => {
    const total = transactions.reduce((acc, item) => {
      if (item.category.type === TypeCategory.outcome) {
        return acc - item.totalTransaction;
      }
      return acc + item.totalTransaction;
    }, 0);
    return total;
  };

  if(transactions.length === 0){
    return(
      <div className="w-96 shadow-lg py-2 rounded-md bg-white">
      <div className="mt-3">
        <h1 className="text-center mt-10 font-bold text-2xl text-sky-800">
          transactions not found
        </h1>
      </div>
    </div>
    )
  }

  return (
    <div className="w-96 shadow-lg py-2 rounded-md bg-white">
      <h3 className={`text-center font-bold text-sky-800 text-2xl`}>
        Transactions
      </h3>
      <div className="border-t-2 mt-3">
        <div className="flex flex-col items-center">
          {transactions.map((items,index) => (
            <div className={`w-full mb-5 ${index === transactions.length -1 ? "border-b-0":"border-b-8"}`}>
              <div className="px-5 flex flex-row w-full justify-between items-center border-b-2">
                <div className="flex flex-row justify-center items-center gap-2">
                  <p className={`font-bold text-5xl text-sky-800`}>
                    {new Date(items.date).getDate() > 9
                      ? new Date(items.date).getDate()
                      : "0" + new Date(items.date).getDate()}
                  </p>
                  <div>
                    <p className={`font-medium text-sm text-emerald-400`}>
                      {days[new Date(items.date).getDay()]}
                    </p>
                    <p className={`font-medium text-sm text-emerald-400`}>
                      {months[new Date(items.date).getMonth()]}{" "}
                      {new Date(items.date).getFullYear()}
                    </p>
                  </div>
                </div>
                <p className={`font-bold ${totalAmount(items.transactions)<0 ?"text-red-600":"text-sky-800"}`}>
                  {formatRupiah(totalAmount(items.transactions))}
                </p>
              </div>
              <div className="flex flex-col mx-5 my-2 gap-2">
                {items.transactions.map((item) => (
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <div
                       onClick={()=>navigate(`/main/detail/${item.id}`)}
                        style={{ backgroundColor: item.category.bgImg }}
                        className={`w-10 h-10 flex items-center justify-center rounded-full`}
                      >
                        <img
                          src={item.category.imgUrl}
                          style={{ width: "70%", height: "70%" }}
                        />
                      </div>
                      <div  onClick={()=>navigate(`/main/detail/${item.id}`)}>
                        <h1 className="font-bold text-sky-800">
                          {item.category.name}
                        </h1>
                        <h1 className="font-medium text-sky-800">
                          {item.information}
                        </h1>
                      </div>
                    </div>
                    <h1
                      className={`${
                        item.category.type === TypeCategory.income
                          ? "text-sky-400"
                          : "text-red-400"
                      } font-medium`}
                    >
                      {formatRupiah(item.totalTransaction)}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionComponent;

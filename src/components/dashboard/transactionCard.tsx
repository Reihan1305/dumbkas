import { days, months } from "../../utils/days";

const TransactionCard = () => {
  const transaction = [
    {
      image: "/transactionCard/family.png",
      desc: "Jajan malam minggu",
      category: {
        name: "Family",
        type: "outcome",
        background: "yellow",
      },
      total: 280000,
    },
    {
      image: "/transactionCard/salary.png",
      desc: "gaji bulanan",
      category: {
        name: "Salary",
        type: "income",
        background: "green",
      },
      total: 5000000,
    },
  ];
  function formatNumber(num: number) {
    return num.toLocaleString("id-ID");
  }

  const today = new Date();

  return (
    <div className="w-80 shadow-lg py-2 rounded-md bg-white">
      <h3 className={`text-center font-bold text-sky-800`}>Transactions</h3>
      <div className="flex flex-row px-5 py-2 items-center justify-between border-y-2">
        <div className="flex flex-row items-center">
          <p className={`font-bold text-4xl text-sky-800`}>{today.getDate()}</p>
          <div className="ml-5">
            <p className={`font-bold text-sm text-emerald-400`}>
              {days[today.getDay()]}
            </p>
            <p className={`font-bold text-sm text-emerald-400`}>
              {months[today.getMonth()]} {today.getFullYear()}
            </p>
          </div>
        </div>
        <p className={`font-medium text-sm text-sky-800`}>
          {formatNumber(5000000 - 280000)}
        </p>
      </div>
      <div>
        {transaction.map((items,index) => (
          <div key={index} className="flex flex-row px-5 py-2 items-center justify-between">
            <div className="flex flex-row items-center">
              <div
                className={`bg-${items.category.background}-500 flex  justify-center items-center rounded-3xl`}
                style={{ width: "50px", height: "50px" }}
              >
                <img src={items.image} style={{ width: "30px" }} />
              </div>
              <div className="ml-5">
                <p className={`font-bold text-sm text-sky-800`}>
                  {items.category.name}
                </p>
                <p className={`font-medium text-sm text-sky-800`}>
                  {items.desc}
                </p>
              </div>
            </div>
            <p
              className={`font-medium text-sm ${
                items.category.type === "income"
                  ? `text-sky-800`
                  : `text-red-500`
              }`}
            >
              {formatNumber(items.total)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionCard;

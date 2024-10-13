const SummaryCard = () => {
  function formatNumber(num: number) {
    return num.toLocaleString("id-ID");
  }
  const summaryTotal = [
    {
      image: "/transactionCard/burger.png",
      total: 100000,
      name: "Food & Beverage",
      background: "blue",
      type: "outcome",
    },
    {
      image: "/transactionCard/family.png",
      total: 100000,
      name: "family",
      background: "yellow",
      type: "outcome",
    },
    {
      image: "/transactionCard/salary.png",
      total: 100000,
      name: "salary",
      background: "green",
      type: "income",
    },
  ];
  return (
    <div className="py-2 w-96 shadow-lg bg-white">
      <h1
        className={`border-b-4 py-5 text-center font-bold text-sky-800 rounded-md`}
      >
        Summary Expense
      </h1>
      {summaryTotal.map((items, index) => (
        <div
          key={index}
          className={`py-2 px-5 flex flex-row items-center gap-5 ${
            index === summaryTotal.length - 1 ? "border-none" : "border-b-2"
          }`}
        >
          <div
            className={`bg-${items.background}-500 flex justify-center items-center rounded-3xl w-14 h-12`}
          >
            <img src={items.image} className="w-7" alt={items.name} />
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className={`font-semibold text-sky-800`}>{items.name}</p>
            <p
              className={`font-semibold ${
                items.type === "income" ? `text-sky-800` : `text-red-500`
              }`}
            >
              {formatNumber(items.total)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;

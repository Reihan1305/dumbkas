import React from "react";
import ReactApexChart from "react-apexcharts";
import { TotalCategory } from "../../types/type";
import { TypeCategory } from "../../types/enum";

interface SummaryComponentProps {
  totalCategories: TotalCategory[];
}

const SummaryComponent: React.FC<SummaryComponentProps> = ({
  totalCategories,
}) => {
  const formatRupiah = (number: number) => {
    if (number == 0) {
      return;
    }
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const series = totalCategories.map((item) => item.total);
  const labels = totalCategories.map((item) => item.name);
  const colors = totalCategories.map((item) => {
    switch (item.background) {
      case "yellow":
        return "#FFFF00"; 
      case "green":
        return "#008000"; 
      default:
        return item.background;
    }
  });

  console.log(colors);

  const totalTransaction = totalCategories.reduce((acc, item) => {
    return item.type === TypeCategory.outcome
      ? acc - item.total
      : acc + item.total;
  }, 0);

  const chartData = {
    series: series,
    options: {
      chart: {
        width: 380,
        type: "pie" as const,
      },
      colors: colors,
      labels: labels,
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  };

  if (totalCategories.length === 0) {
    return (
      <div className="w-96 shadow-lg py-2 rounded-md bg-white">
        <div className="mt-3">
          <h1 className="text-center mt-10 font-bold text-2xl text-sky-800">
            transactions not found
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="py-2 w-96 shadow-lg bg-white rounded-md h-full">
      <h1 className="border-b-4 py-1 text-center font-bold text-sky-800 rounded-md">
        Summary Expense
      </h1>
      <div>
        <div id="chart" className="flex items-center">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="pie"
            width={280}
          />
          <h1 className={`${totalTransaction<0?"text-red-600":"text-sky-600"} font-bold ${totalTransaction>1000000?"text-md":"text-xl"}`}>
            {formatRupiah(totalTransaction)}
          </h1>
        </div>
        <div className="flex flex-col">
          {totalCategories.map((item, index) => (
            <div
              key={item.name}
              className={`flex flex-row justify-between items-center px-5 py-2 ${
                index === 0
                  ? "border-b-2"
                  : index === totalCategories.length - 1 &&
                    totalCategories.length === 2
                  ? ""
                  : "border-t-2 border-b-0"
              }`}
            >
              <div className="flex flex-row gap-5 justify-center items-center">
                <div
                  style={{ backgroundColor: item.background }}
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                >
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    style={{ width: "70%", height: "70%" }}
                  />
                </div>
                <h1 className="font-bold text-sky-800">{item.name}</h1>
              </div>
              <h1
                className={`font-medium ${
                  item.type === TypeCategory.income
                    ? "text-sky-400"
                    : "text-red-400"
                }`}
              >
                {formatRupiah(item.total)}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryComponent;

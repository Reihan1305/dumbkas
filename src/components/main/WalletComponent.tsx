import React from "react";
import { IBalance } from "../../types/type";

const WalletComponent: React.FC<IBalance> = ({
  totalIncome,
  totaloutcome,
  balance,
}) => {
  const mainStyle =
    "w-80 h-24 flex flex-row items-center gap-7 px-5 rounded-md bg-white";
  const descStyle = "text-sky-600";
  const totalStyle = "text-sky-800 font-bold text-xl";
  function formatRupiah(number: number) {
    if(number == 0){
      return 0
    }
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className={mainStyle}>
        <img src="/walletComponent/balance.png" style={{ width: "50px" }} />
        <div>
          <p className={descStyle}>Inflow</p>
          <p className={totalStyle}>{formatRupiah(totalIncome)}</p>
        </div>
      </div>
      <div className={mainStyle}>
        <img src="/walletComponent/outcome.png" style={{ width: "50px" }} />
        <div>
          <p className={descStyle}>Outflow</p>
          <p className={totalStyle}>{formatRupiah(totaloutcome)}</p>
        </div>
      </div>
      <div className={mainStyle}>
        <img src="/walletComponent/balance.png" style={{ width: "50px" }} />
        <div>
          <p className={descStyle}>Balance</p>
          <p className={totalStyle}>{formatRupiah(balance)}</p>
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;

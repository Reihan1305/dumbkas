import React from "react";
import {
  GroupedTransaction,
  IBalance,
  TotalCategory,
  Transaction,
} from "../../types/type";
import { TypeCategory } from "../../types/enum";
import WalletComponent from "./WalletComponent";
import TransactionComponent from "./TransactionComponent";
import SummaryComponent from "./SummaryComponent";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "../navbar/loginNavbar";
import TabList from "./TabList";
import dayjs from "dayjs"; 

interface MainProps {
  transaction: Transaction[];
  Balance: IBalance;
}

const MainComponent: React.FC<MainProps> = ({ transaction, Balance }) => {
  const navigate = useNavigate();

  const groupedTransaction = transaction.length
    ? transaction.reduce((acc, transaction) => {
        const createdAt = dayjs(transaction.createdAt).format("YYYY-MM-DD"); 
        if (!acc[createdAt]) {
          acc[createdAt] = [];
        }
        acc[createdAt].push(transaction);
        return acc;
      }, {} as Record<string, Transaction[]>)
    : {};

  const groupedArray: GroupedTransaction[] = transaction.length
    ? Object.entries(groupedTransaction).map(([date, transactions]) => ({
        date,
        transactions,
      }))
    : [];

  // Menghitung total transaksi berdasarkan kategori
  function totalByCategory(transactions: Transaction[]): TotalCategory[] {
    if (!transactions.length) return [];

    const totalsByCategory = transactions.reduce((acc, transaction) => {
      const categoryName = transaction.category.name;
      const categoryImg = transaction.category.imgUrl;
      const categoryType = transaction.category.type;
      const categoryBackground = transaction.category.bgImg;
      if (!acc[categoryName]) {
        acc[categoryName] = {
          total: 0,
          imgUrl: categoryImg,
          type: categoryType,
          background: categoryBackground,
        };
      }
      acc[categoryName].total += transaction.totalTransaction;
      return acc;
    }, {} as { [key: string]: { imgUrl: string; type: TypeCategory; total: number; background: string } });

    return Object.entries(totalsByCategory).map(([category, data]) => ({
      name: category,
      imgUrl: data.imgUrl,
      type: data.type,
      total: data.total,
      background: data.background,
    }));
  }

  const totalByCategoryResult = totalByCategory(transaction);
  return (
    <div>
      <LoginNavbar />
      <TabList />
      <div className="flex flex-row gap-20 justify-center mt-10">
        {/* Komponen Wallet */}
        <WalletComponent
          totalIncome={Balance.totalIncome}
          totaloutcome={Balance.totaloutcome}
          balance={Balance.balance}
        />

        {/* Komponen Transaksi (Tergroup per Tanggal) */}
        {transaction.length > 0 ? (
          <TransactionComponent transactions={groupedArray} />
        ) : (
          <p>No transactions available.</p>
        )}

        {/* Komponen Ringkasan Total per Kategori */}
        <SummaryComponent totalCategories={totalByCategoryResult} />
      </div>

      {/* Tombol untuk Menambah Transaksi */}
      <button
        className="fixed bottom-4 right-4 bg-black px-2 py-2 rounded-full hover:bg-white transition duration-300 ease-in-out"
        style={{ zIndex: 999, pointerEvents: "auto" }}
        onClick={() => {
          navigate("/main/addtransaction");
        }}
      >
        <img
          src="/plus.png"
          className="w-10 h-10 transition duration-300 ease-in-out"
          style={{
            filter: "invert(1)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "invert(0)")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "invert(1)")}
        />
      </button>
    </div>
  );
};

export default MainComponent;

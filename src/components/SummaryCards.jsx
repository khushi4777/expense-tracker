import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function SummaryCards() {

  const { state } = useContext(ExpenseContext);

  const income = state.transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = state.transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Balance */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <h3 className="text-gray-500"> Balance</h3>
        <p className="text-3xl font-bold text-indigo-600">
          ₹ {balance}
        </p>
      </div>

      {/* Income */}
      <div className="bg-green-100 shadow-lg rounded-2xl p-6 text-center">
        <h3 className="text-gray-600">Income</h3>
        <p className="text-3xl font-bold text-green-600">
          ₹ {income}
        </p>
      </div>

      {/* Expense */}
      <div className="bg-red-100 shadow-lg rounded-2xl p-6 text-center">
        <h3 className="text-gray-600"> Expense</h3>
        <p className="text-3xl font-bold text-red-600">
          ₹ {expense}
        </p>
      </div>

    </div>

  );
}

export default SummaryCards;
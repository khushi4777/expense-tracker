import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function ExpenseItem({ transaction }) {

  const { removeTransaction } = useContext(ExpenseContext);

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-2xl shadow-md hover:scale-[1.02] transition 
      ${transaction.type === "expense" ? "bg-red-50" : "bg-green-50"}`}
    >

      <div>
        <h3 className="font-semibold">{transaction.title}</h3>

        <p className="text-sm text-gray-600">
          {transaction.category}
        </p>
                <p className="text-xs text-gray-400">
          {transaction.date}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <span
          className={
            transaction.type === "expense"
              ? "font-bold text-red-500"
              : "font-bold text-green-600"
          }
        >
          ₹ {transaction.amount}
        </span>

        <button
          onClick={() => removeTransaction(transaction.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ExpenseItem;
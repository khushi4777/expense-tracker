import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";

function ExpenseList() {
  const { state } = useContext(ExpenseContext);

  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = state.transactions.filter((t) => {
    const typeMatch = filterType === "all" || t.type === filterType;
    const categoryMatch = filterCategory === "all" || t.category === filterCategory;
    const searchMatch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatch && categoryMatch && searchMatch;
  });

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-2xl p-6 mt-6">

      <h2 className="text-2xl font-bold mb-4">
        Transaction History
      </h2>

      {/* Filters + Search */}
      <div className="flex flex-wrap gap-4 mb-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search transaction..."
          className="border p-2 rounded-lg w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Type Filter */}
        <select
          className="border p-2 rounded-lg"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category Filter */}
        <select
          className="border p-2 rounded-lg"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

      </div>

      {/* Header row for transactions */}
      <div className="flex justify-between items-center p-3 font-bold border-b border-gray-200 dark:border-gray-600">
        <span className="w-24">Date</span>
        <span className="flex-1 px-2">Title</span>
        <span className="px-2">Amount</span>
        <span className="px-2">Category</span>
        <span className="px-2">Type</span>
      </div>

      {/* Transaction List */}
      <div className="space-y-3 mt-2">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500">No transactions found</p>
        ) : (
          filteredTransactions.map((transaction) => (
            <ExpenseItem
              key={transaction.id}
              transaction={transaction}
            />
          ))
        )}
      </div>

    </div>
  );
}

export default ExpenseList;
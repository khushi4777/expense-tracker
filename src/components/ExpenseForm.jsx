import { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function ExpenseForm() {

  const { addTransaction } = useContext(ExpenseContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title || amount <= 0) {
      alert("Please enter valid title and amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),   // unique id
      title: title,
      amount: Number(amount),
      category: category,
      type: type,
      date: new Date().toLocaleDateString()
    };

    addTransaction(newTransaction);

    // Reset form
    setTitle("");
    setAmount("");
    setCategory("Food");
    setType("expense");
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl p-8 w-full">

      <h2 className="text-2xl font-bold mb-4">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded-lg w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded-lg w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="border p-2 rounded-lg w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <select
          className="border p-2 rounded-lg w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-700 transition"
        >
          Add Transaction
        </button>

      </form>

    </div>
  );
}

export default ExpenseForm;

import { useEffect, useState } from "react";
import { getExpenses, addExpense, deleteExpense } from "./api/api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import ThemeToggle from "./components/ThemeToggle";


function App() {

  const [expenses, setExpenses] = useState([]);

const fetchExpenses = async () => {
  const res = await getExpenses();
  setExpenses(res.data);
};

useEffect(() => {
  fetchExpenses();
}, []);

const handleAddExpense = async () => {
  await addExpense({
    title,
    amount,
    category
  });

  fetchExpenses();
};

const handleDelete = async (id) => {
  await deleteExpense(id);
  fetchExpenses();
};
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-6">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">

  <div>
    <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
      Personal Expense Tracker
    </h1>
    <p className="text-gray-500 dark:text-gray-400">
      Track your spending smartly
    </p>
  </div>

  

</div>

  <ThemeToggle />
        {/* Dashboard Section */}
        <SummaryCards />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <ExpenseForm onAdd={handleAddExpense} />
          <ExpenseList onDelete={handleDelete} expenses={expenses} />

        </div>

        {/* Charts */}
        <Charts />

      

      </div>

    </div>
  );
}

export default App;


// function App() {
//   return (
//     <div className="bg-green-500 text-white p-10 text-3xl">
//       Tailwind is Working 🚀
//     </div>
//   );
// }

// export default App;
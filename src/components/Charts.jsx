import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function Charts() {

  const { state } = useContext(ExpenseContext);

  const expenses = state.transactions.filter(
    (t) => t.type === "expense"
  );

  const categoryData = expenses.reduce((acc, curr) => {

    const existing = acc.find(
      (item) => item.name === curr.category
    );

    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({
        name: curr.category,
        value: curr.amount
      });
    }

    return acc;

  }, []);

  const COLORS = [
    "#6366f1",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6"
  ];

  const incomeTotal = state.transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenseTotal = state.transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = expenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const barData = [
    { name: "Income", amount: incomeTotal },
    { name: "Expense", amount: expenseTotal }
  ];

  return (

    <div className="bg-white shadow-xl rounded-3xl p-8 mt-8">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Expense Analytics
        </h2>
        <p className="text-gray-500 text-sm">
          Visual overview of your spending
        </p>
      </div>

      {categoryData.length === 0 ? (

        <div className="text-center text-gray-400 py-10">
          No expense data available
        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Pie Chart */}

          <div className="w-full h-80">

            <h3 className="font-semibold mb-2 text-center">
              Category Distribution
            </h3>

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                >

                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Bar Chart */}

          <div className="w-full h-80">

            <h3 className="font-semibold mb-2 text-center">
              Income vs Expense
            </h3>

            <ResponsiveContainer>

              <BarChart data={barData}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="amount"
                  fill="#6366f1"
                  radius={[10,10,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}

      {/* Total Expense */}

      <div className="text-center mt-10">

        <p className="text-gray-500 text-sm">
          Total Expense
        </p>

        <p className="text-3xl font-bold text-red-500">
          ₹ {totalExpense}
        </p>

      </div>

    </div>

  );

}

export default Charts;
import { createContext, useReducer, useEffect } from "react";
import { getExpenses, addExpense, deleteExpense } from "../api/api";

export const ExpenseContext = createContext();

const initialState = {
  transactions: []
};

function expenseReducer(state, action) {
  switch (action.type) {

    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload
      };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t.id !== action.payload
        )
      };

    default:
      return state;
  }
}

export const ExpenseProvider = ({ children }) => {

  const [state, dispatch] = useReducer(
    expenseReducer,
    initialState
  );

  // Load expenses from database
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await getExpenses();
    dispatch({
      type: "SET_TRANSACTIONS",
      payload: res.data
    });
  };

  // Add expense
  const addTransaction = async (transaction) => {

    const res = await addExpense(transaction);

    dispatch({
      type: "ADD_TRANSACTION",
      payload: res.data
    });
  };

  // Delete expense
  const removeTransaction = async (id) => {

    await deleteExpense(id);

    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        state,
        addTransaction,
        removeTransaction
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
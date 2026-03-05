import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition"
    >
      {darkMode ? "☀" : ""}
    </button>
  );
}

export default ThemeToggle;
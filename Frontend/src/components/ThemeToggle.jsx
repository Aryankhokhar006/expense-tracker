import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm transition-all hover:scale-105 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
    >
      {darkMode ? (
        <span className="transition-transform group-hover:rotate-12">
          ☀️
        </span>
      ) : (
        <span className="transition-transform group-hover:-rotate-12">
          🌙
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
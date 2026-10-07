import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import ExpenseCard from "../components/ExpenseCard";

import expenseService from "../services/expenseService";
import { CATEGORIES } from "../services/constants";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadExpenses();
  }, [category]);

  const loadExpenses = async () => {
    try {
      setLoading(true);

      const data = await expenseService.getExpenses(category);

      setExpenses(data.expenses || []);
      setError("");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load expenses"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await expenseService.deleteExpense(id);

      setExpenses((current) =>
        current.filter((expense) => expense._id !== id)
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to delete expense"
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Expenses
              </h1>

              <p className="mt-1 text-gray-600">
                All your spending in one place
              </p>
            </div>

            <div className="flex gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value="">All categories</option>

                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </option>
                ))}
              </select>

              <Link
                to="/expenses/create"
                className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white hover:bg-blue-700"
              >
                + Add Expense
              </Link>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* List */}
          {expenses.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow">
              <h2 className="text-xl font-semibold text-gray-800">
                No Expenses Found
              </h2>

              <p className="mt-2 text-gray-500">
                Add your first expense to get started.
              </p>

              <Link
                to="/expenses/create"
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
              >
                Add Expense
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {expenses.map((expense) => (
                <ExpenseCard
                  key={expense._id}
                  expense={expense}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Expenses;

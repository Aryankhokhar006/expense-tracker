import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

import expenseService from "../services/expenseService";
import { useAuth } from "../context/AuthContext";
import {
  CATEGORY_STYLES,
  formatMoney
} from "../services/constants";

const Dashboard = () => {
  const { user } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [expenseData, summaryData] = await Promise.all([
          expenseService.getExpenses(),
          expenseService.getSummary()
        ]);

        setExpenses(expenseData.expenses || []);
        setSummary(summaryData);
        setError("");
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const byCategory = summary?.byCategory || {};

  const topCategory = Object.entries(byCategory).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const stats = [
    {
      title: "Total Spent",
      value: formatMoney(summary?.total),
      icon: "₹",
      bg: "bg-blue-50",
      text: "text-blue-600"
    },
    {
      title: "This Month",
      value: formatMoney(summary?.thisMonth),
      icon: "◷",
      bg: "bg-amber-50",
      text: "text-amber-600"
    },
    {
      title: "Expenses",
      value: summary?.count || 0,
      icon: "▦",
      bg: "bg-violet-50",
      text: "text-violet-600"
    },
    {
      title: "Top Category",
      value: topCategory ? topCategory[0] : "-",
      icon: "★",
      bg: "bg-emerald-50",
      text: "text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-8">

          {/* Welcome */}
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-600">
                Welcome back 👋
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Hello, {user?.name}
              </h1>

              <p className="mt-2 text-slate-500">
                Here's a look at where your money is going.
              </p>
            </div>

            <Link
              to="/expenses/create"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              + Add Expense
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-2xl font-bold capitalize text-slate-900">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${stat.bg} ${stat.text}`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Expenses */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 p-5 md:p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Expenses
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest spending
                </p>
              </div>

              <Link
                to="/expenses"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all →
              </Link>
            </div>

            {expenses.length === 0 ? (
              <div className="p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  ₹
                </div>

                <h3 className="mt-4 font-semibold text-slate-800">
                  No expenses yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add your first expense and start tracking.
                </p>

                <Link
                  to="/expenses/create"
                  className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Add Expense
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {expenses.slice(0, 5).map((expense) => (
                  <div
                    key={expense._id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-800">
                        {expense.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          CATEGORY_STYLES[expense.category] ||
                          CATEGORY_STYLES.other
                        }`}
                      >
                        {expense.category}
                      </span>

                      <span className="font-bold text-slate-900">
                        {formatMoney(expense.amount)}
                      </span>

                      <Link
                        to={`/expenses/edit/${expense._id}`}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;

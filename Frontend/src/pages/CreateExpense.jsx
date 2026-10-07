import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ExpenseForm from "../components/ExpenseForm";

import expenseService from "../services/expenseService";

const CreateExpense = () => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setError("");

    try {
      setSaving(true);

      await expenseService.createExpense(formData);

      navigate("/expenses");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to add expense"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Add Expense
              </h1>

              <p className="mt-1 text-gray-600">
                Record a new expense
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              {error && (
                <div className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">
                  {error}
                </div>
              )}

              <ExpenseForm
                onSubmit={handleSubmit}
                submitting={saving}
                buttonText="Add Expense"
              />

              <Link
                to="/expenses"
                className="mt-4 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                ← Cancel
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateExpense;

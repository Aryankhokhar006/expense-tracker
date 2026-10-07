import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import ExpenseForm from "../components/ExpenseForm";

import expenseService from "../services/expenseService";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExpense = async () => {
      try {
        setLoading(true);

        const data = await expenseService.getExpense(id);

        setExpense(data.expense);
        setError("");
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load expense"
        );
      } finally {
        setLoading(false);
      }
    };

    loadExpense();
  }, [id]);

  const handleSubmit = async (formData) => {
    setError("");

    try {
      setSaving(true);

      await expenseService.updateExpense(id, formData);

      navigate("/expenses");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update expense"
      );
    } finally {
      setSaving(false);
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
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Edit Expense
              </h1>

              <p className="mt-1 text-gray-600">
                Update expense details
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              {error && (
                <div className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">
                  {error}
                </div>
              )}

              {expense && (
                <ExpenseForm
                  initialData={expense}
                  onSubmit={handleSubmit}
                  submitting={saving}
                  buttonText="Update Expense"
                />
              )}

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

export default EditExpense;

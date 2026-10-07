import { useEffect, useState } from "react";

import { CATEGORIES } from "../services/constants";

const emptyForm = {
  title: "",
  amount: "",
  category: "food",
  date: new Date().toISOString().substring(0, 10),
  note: ""
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500";

const ExpenseForm = ({
  initialData,
  onSubmit,
  buttonText = "Add Expense",
  submitting = false
}) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        amount: initialData.amount ?? "",
        category: initialData.category || "other",
        date: initialData.date
          ? initialData.date.substring(0, 10)
          : emptyForm.date,
        note: initialData.note || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      amount: Number(formData.amount)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g. Lunch, Auto fare, Electricity bill"
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Amount (₹)
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={inputClass}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() +
                category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Note (optional)
        </label>

        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows="3"
          placeholder="Anything to remember about this expense"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Saving..." : buttonText}
      </button>

    </form>
  );
};

export default ExpenseForm;

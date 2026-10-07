import { Link } from "react-router-dom";

import {
  CATEGORY_STYLES,
  formatMoney
} from "../services/constants";

const ExpenseCard = ({ expense, onDelete }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-gray-800">
            {expense.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>

        <p className="text-xl font-bold text-gray-900">
          {formatMoney(expense.amount)}
        </p>

      </div>

      <div className="mt-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            CATEGORY_STYLES[expense.category] ||
            CATEGORY_STYLES.other
          }`}
        >
          {expense.category}
        </span>
      </div>

      {expense.note && (
        <p className="mt-4 text-gray-600">{expense.note}</p>
      )}

      <div className="mt-6 flex gap-3">

        <Link
          to={`/expenses/edit/${expense._id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(expense._id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default ExpenseCard;

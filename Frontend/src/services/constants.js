export const CATEGORIES = [
  "food",
  "travel",
  "shopping",
  "bills",
  "health",
  "entertainment",
  "other"
];

export const CATEGORY_STYLES = {
  food: "bg-orange-50 text-orange-600",
  travel: "bg-sky-50 text-sky-600",
  shopping: "bg-pink-50 text-pink-600",
  bills: "bg-red-50 text-red-600",
  health: "bg-emerald-50 text-emerald-600",
  entertainment: "bg-violet-50 text-violet-600",
  other: "bg-slate-100 text-slate-600"
};

export const formatMoney = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2
  })}`;

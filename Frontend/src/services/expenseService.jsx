import api from "./api";

const getExpenses = async (category) => {
  const response = await api.get("/expenses", {
    params: category ? { category } : {}
  });
  return response.data;
};

const getSummary = async () => {
  const response = await api.get("/expenses/summary");
  return response.data;
};

const getExpense = async (id) => {
  const response = await api.get(`/expenses/${id}`);
  return response.data;
};

const createExpense = async (expenseData) => {
  const response = await api.post("/expenses", expenseData);
  return response.data;
};

const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/expenses/${id}`, expenseData);
  return response.data;
};

const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

export default {
  getExpenses,
  getSummary,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense
};

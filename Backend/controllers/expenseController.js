const Expense = require("../models/Expense");

// Only these fields can be set from the request body
const pickFields = (body) => {
  const fields = {};

  ["title", "amount", "category", "date", "note"].forEach((key) => {
    if (body[key] !== undefined) {
      fields[key] = body[key];
    }
  });

  return fields;
};


// GET /api/expenses?category=food
const getExpenses = async (req, res) => {
  try {
    const filter = { userId: req.user._id };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const expenses = await Expense.find(filter).sort({
      date: -1,
      createdAt: -1
    });

    res.json({ expenses });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses"
    });
  }
};


// GET /api/expenses/summary
const getSummary = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.user._id
    });

    const now = new Date();

    let total = 0;
    let thisMonth = 0;
    const byCategory = {};

    expenses.forEach((expense) => {
      total += expense.amount;

      byCategory[expense.category] =
        (byCategory[expense.category] || 0) + expense.amount;

      const d = new Date(expense.date);

      if (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      ) {
        thisMonth += expense.amount;
      }
    });

    res.json({
      count: expenses.length,
      total,
      thisMonth,
      byCategory
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch summary"
    });
  }
};


// GET /api/expenses/:id
const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json({ expense });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expense"
    });
  }
};


// POST /api/expenses
const createExpense = async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || amount === undefined || amount === "") {
      return res.status(400).json({
        message: "Title and amount are required"
      });
    }

    if (Number(amount) < 0 || Number.isNaN(Number(amount))) {
      return res.status(400).json({
        message: "Amount must be a positive number"
      });
    }

    const expense = await Expense.create({
      ...pickFields(req.body),
      userId: req.user._id
    });

    res.status(201).json({
      message: "Expense added",
      expense
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to add expense"
    });
  }
};


// PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      pickFields(req.body),
      {
        new: true,
        runValidators: true
      }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json({
      message: "Expense updated",
      expense
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to update expense"
    });
  }
};


// DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json({
      message: "Expense deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense"
    });
  }
};


module.exports = {
  getExpenses,
  getSummary,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense
};

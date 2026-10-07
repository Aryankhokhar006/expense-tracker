const express = require("express");

const {
  getExpenses,
  getSummary,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getExpenses);

// must come before "/:id"
router.get("/summary", getSummary);

router.get("/:id", getExpense);

router.post("/", createExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

module.exports = router;

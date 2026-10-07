const mongoose = require("mongoose");

const CATEGORIES = [
  "food",
  "travel",
  "shopping",
  "bills",
  "health",
  "entertainment",
  "other"
];

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: String,
      enum: CATEGORIES,
      default: "other"
    },

    date: {
      type: Date,
      default: Date.now
    },

    note: {
      type: String,
      trim: true,
      default: ""
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
module.exports.CATEGORIES = CATEGORIES;

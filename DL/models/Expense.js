const mongoose = require("mongoose");

const Expense = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  target: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Target",
    required: true,
  },
  dashboard: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Dashboard",
  },
  source: {
    type: String,
    required: true,
    enum: ["telegram", "web"],
    default: "telegram",
  },
});
module.exports = mongoose.model("Expense", Expense);

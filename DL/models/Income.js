const mongoose = require("mongoose");

const Income = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "TelegramUser",
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
module.exports = mongoose.model("Income", Income);

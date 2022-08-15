const mongoose = require("mongoose");

const Target = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 },
  goal: { type: Number, required: true, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
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
module.exports = mongoose.model("Target", Target);

const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  collabrates: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Dashboard", DashboardSchema);

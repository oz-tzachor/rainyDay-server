const mongoose = require("mongoose");

const TelegramUser = new mongoose.Schema({
  chatId: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  defaultDashboardName: {
    type: String,
  },
  defaultDashboardTelegram: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Dashboard",
  },
  state: {
    type: String,
    default: "initial",
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
  updatedAt: {
    type: String,
    default: new Date(),
  },
  firstName: { type: String },
  collabrates: [{ type: String }],
  isCollabrated: { type: Boolean, default: false },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  targetDetails: {
    name: { type: String },
    max: { type: Number, default: 0 },
    goal: { type: Number },
  },
  expenseDetails: {
    amount: { type: Number },
    description: { type: String },
    target: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Target",
    },
  },
  incomeDetails: {
    amount: { type: Number },
    description: { type: String },
    target: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Target",
    },
  },
  authenticated: {
    type: Boolean,
    required: true,
    default: false,
  },
  processStartTime: {
    type: Number,
    required: true,
    default: -1,
  },
});

// TODO: import connect, create fake data and check CRUD for this data.
const TelegramUserModel = mongoose.model("TelegramUser", TelegramUser);
module.exports = TelegramUserModel;

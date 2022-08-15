const express = require("express");
const router = express.Router();
const expenseLogic = require("../BL/expenseLogic");

router.post("/new", async (req, res) => {
  // req.body.createdBy = req.user._id;
  const newExpense = await expenseLogic.createNewExpense(req.body);
  res.send(newExpense);
});
router.get("/:targetId", async (req, res) => {
  const expenses = await expenseLogic.getExpenses(req.params.targetId);
  res.send(expenses);
});
module.exports = router;

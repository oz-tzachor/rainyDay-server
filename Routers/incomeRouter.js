const express = require("express");
const router = express.Router();
const expenseLogic = require("../BL/expenseLogic");
const incomeLogic = require("../BL/incomeLogic");

router.post("/new", async (req, res) => {
  // req.body.createdBy = req.user._id;
  const newIncome = await incomeLogic.createNewIncome(req.body);
  res.send(newIncome);
});
router.get("/:targetId", async (req, res) => {
  const incomes = await incomeLogic.getIncomes(req.params.targetId);
  res.send(incomes);
});
module.exports = router;

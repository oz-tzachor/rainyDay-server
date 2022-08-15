const express = require("express");
const router = express.Router();
const expenseLogic = require("../BL/expenseLogic");
const targetLogic = require("../BL/targetLogic");

router.post("/new", async (req, res) => {
  // req.body.createdBy = req.user._id;
  const newTarget = await targetLogic.createNewTarget(req.body);
  res.send(newTarget);
});
router.post("/all", async (req, res) => {
  const users = await targetLogic.getAllTargets();
  res.send(users);
});
router.get("/", async (req, res) => {
  const users = await expenseLogic.getExpense();
  res.send(users);
});
module.exports = router;

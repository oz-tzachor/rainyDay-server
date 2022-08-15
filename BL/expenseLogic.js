const expenseController = require("../DL/Controllers/ExpenseController");
const targetController = require("../DL/Controllers/TargetController");
const { updateSocket } = require("../DL/sockets/socket");

exports.createNewExpense = async (newExpenseDetails) => {
  let newExpense = await expenseController.create(newExpenseDetails);
  const targetForUpdate = await targetController.readOne({
    _id: newExpenseDetails.target,
  });
  targetForUpdate.amount -= newExpenseDetails.amount;
  targetForUpdate.save();
  // updateSocket();
  return newExpense;
};

exports.getExpenses = (targetId) => {
  return expenseController.read({ target: targetId });
};
// exports.createNewExpense = async (newExpenseDetails) => {
//   let newExpense = await expenseController.create(newExpenseDetails);
//   const budgetForUpdate = await budgetController.readOne({
//     _id: newExpenseDetails.budget,
//   });
//   const elmtToPush = newExpense._id;
//   budgetForUpdate.expenses.push(elmtToPush);
//   budgetForUpdate.save();
//   updateSocket();
//   return newExpense;
// };

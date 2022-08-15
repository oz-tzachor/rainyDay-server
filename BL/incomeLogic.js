const expenseController = require("../DL/Controllers/ExpenseController");
const incomeController = require("../DL/Controllers/IncomeController");
const targetController = require("../DL/Controllers/TargetController");
const { updateSocket } = require("../DL/sockets/socket");

exports.createNewIncome = async (newIncomeDetails) => {
  let newIncome = await incomeController.create(newIncomeDetails);
  const targetForUpdate = await targetController.readOne({
    _id: newIncomeDetails.target,
  });
  targetForUpdate.amount += newIncomeDetails.amount;
  targetForUpdate.save();
  // updateSocket();
  return newIncome;
};
exports.getIncomes = (targetId) => {
  return incomeController.read({ target: targetId });
};

// exports.createNewIncome = async (newExpenseDetails) => {
//   let newIncome = await expenseController.create(newExpenseDetails);
//   const budgetForUpdate = await budgetController.readOne({
//     _id: newExpenseDetails.budget,
//   });
//   const elmtToPush = newIncome._id;
//   budgetForUpdate.expenses.push(elmtToPush);
//   budgetForUpdate.save();
//   updateSocket();
//   return newIncome;
// };

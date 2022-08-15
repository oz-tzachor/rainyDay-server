const targetController = require("../DL/Controllers/TargetController");
const { updateSocket } = require("../DL/sockets/socket");

exports.createNewTarget = async (newTargetDetails) => {
  let newTarget = await targetController.create(newTargetDetails);
  // updateSocket();
  return newTarget;
};
exports.getTarget = (targetId) => {
  return targetController.read({ _id: targetId });
};
exports.getAllTargets = (filter) => {
  return targetController.read(filter);
};
// exports.createNewTraget = async (newTargetDetails) => {
//   let newExpense = await targetController.create(newTargetDetails);
//   const budgetForUpdate = await budgetController.readOne({
//     _id: newExpenseDetails.budget,
//   });
//   const elmtToPush = newExpense._id;
//   budgetForUpdate.expenses.push(elmtToPush);
//   budgetForUpdate.save();
//   updateSocket();
//   return newExpense;
// };

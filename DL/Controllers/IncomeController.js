const IncomeModel = require("../models/Income");

async function create(data) {
  return await IncomeModel.create(data);
}
async function read(filter) {
  return await IncomeModel.find(filter)
    .populate("target")
    .populate("createdBy");
}
async function update(filter, newData) {
  return await IncomeModel.updateOne(filter, newData);
}
async function del(filter) {
  await update(filter, { isActive: flase });
}

module.exports = { create, read, update, del };

const TargetModel = require("../models/Target");

async function create(data) {
  return await TargetModel.create(data);
}
async function read(filter) {
  return await TargetModel.find(filter);
}
async function readOne(filter) {
  return await TargetModel.findOne(filter).exec();
}
async function update(filter, newData) {
  return await TargetModel.updateOne(filter, newData);
}
async function del(filter) {
  await update(filter, { isActive: flase });
}

module.exports = { create, read, readOne, update, del };

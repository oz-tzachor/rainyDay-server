const TargetModel = require("../models/Target");

async function create(data) {
  return await TargetModel.create(data);
}
async function read(filter) {
  return await TargetModel.find(filter).populate("createdBy");
}
async function readOne(filter) {
  return await TargetModel.findOne(filter).populate("createdBy").exec();
}
async function update(filter, newData) {
  return await TargetModel.updateOne(filter, newData);
}

async function del(filter) {
  await update(filter, { isActive: flase });
}
async function delAll(filter) {
  return await TargetModel.deleteMany({});
}
module.exports = { create, read, readOne, update, del, delAll };

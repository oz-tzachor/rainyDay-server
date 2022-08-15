const telegramUserController = require("../DL/Controllers/TelegramUserController");
const userController = require("../DL/Controllers/UserController");

async function newTelegramUser(newUserDetails) {
  const newUser = await telegramUserController.create(newUserDetails);
  return newUser;
}
async function getTelegramUser(filter) {
  const telegramUser = await telegramUserController.readOne(filter);
  return telegramUser;
}
async function changeTelegramState(chatId, state) {
  const telegramUser = await telegramUserController.readOne({ chatId });
  telegramUser.state = state;
  telegramUser.save();
  return telegramUser;
}
async function updateUserDetails(chatId, newData) {
  const telegramUser = await telegramUserController.update({ chatId }, newData);
  return telegramUser;
}
async function saveTempData(chatId, type, data) {
  const telegramUser = await telegramUserController.readOne({ chatId });
  telegramUser[type] = { ...telegramUser[type], ...data };
  telegramUser.save();
  return telegramUser;
}

module.exports = {
  newTelegramUser,
  getTelegramUser,
  changeTelegramState,
  saveTempData,
  updateUserDetails,
};

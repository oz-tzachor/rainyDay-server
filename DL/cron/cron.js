const cron = require("node-cron");
const telegramUserLogic = require("../../BL/telegramUserLogic");
const targetLogic = require("../../BL/targetLogic");
const { showAllTargets } = require("../bot/messagesTemplates");
let cron_sendMessage;
let initializeCron = (sendMessage) => {
  cron_sendMessage = sendMessage;
  // createCron();
};
// let sayHi = cron.schedule("1 1,30,57 16,17,18,19,20 * * *", async function () {

// let sayHi = cron.schedule("* * * * * * *", async function () {
//   let users = await telegramUserLogic.getAllTelegramUsers({});
//   let targets = await targetLogic.getAllTargets({ createdBy: users[0]._id });
//   console.log("running a task every 6 seconds");
//   for (let index = 0; index < 2; index++) {
//     cron_sendMessage(users[0].chatId, "Remider\n\n" + showAllTargets(targets));
//   }
//   // if (cron_sendMessage) cron_sendMessage(users[0].chatId, "Hi!");
//   // sayHi.stop();
// });
let createCron = () => {
  // sayHi.start();
};

module.exports = { createCron, initializeCron };

// const TelegramBot = require("node-telegram-bot-api");
// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
// const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
// const { newMessage } = require("./messages");
////////
exports.sendMessage = (chatId, message) => {
  console.log("hello from message");
  bot.sendMessage(chatId, message);
  return;
};
exports.dealWithMessage = async () => {
  bot.on("message", async (msg) => {
    let chatId = msg.chat.id;
    let text = msg.text;
    // newMessage(chatId, text, sendMessage);
  });
};

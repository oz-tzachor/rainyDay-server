const TelegramBot = require("node-telegram-bot-api");
const { newMessage } = require("./messages");
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
////////
const sendMessage = (chatId, message) => {
  let messageToSent = ``;
  bot.sendMessage(chatId, message);
  return;
};
let dealWithMessage = async () => {
  bot.on("message", async (msg) => {
    let chatId = msg.chat.id;
    let text = msg.text;
    newMessage(chatId, text, sendMessage);
  });
};
module.exports = { dealWithMessage, sendMessage };
